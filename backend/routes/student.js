const auth = require('../middleware/auth');
const ErrorUtil = require('../util/ErrorUtil');
const ResponseUtil = require('../util/Response');
var express = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const ClassInfo = require('../models/ClassInfo');
const stringMessage = require('../value/string');
const QR = require('../util/QR')
const userUtil = require('../util/UserUtils');
const { STATUS } = require('../value/model');
const { getAllSubjectsOfStudent } = require('../util/ClassUtils');
const router = express.Router()


/**
 * @typedef ListUsers
 * @property {integer} count.required - số lượng phần tử
 * @property {Array.<User>} data.required - các phần tử
 */


/**
 * Get tất cả tài khoản sinh viên hiện có. Chỉ có tài khoản quyền Admin mới thực hiện được chức năng này.
 * @route GET /students/
 * @group Student
 * @returns {ListUsers.model} 200 - Thông tin tài khoản và token ứng với tài khoản đó.
 * @returns {Error.model} 500 - Lỗi.
 * @security Bearer
 */
router.get('/', auth.isAdmin, async (req, res) => {
  User.find({ role: "student" }, function (err, users) {
    //console.log(users);
    if (err) {
      res.status(500).send(ResponseUtil.makeMessageResponse(err))
    }
    else {
      // console.log((users));
      res.status(200).send(ResponseUtil.makeResponse(users.map(item => ({
        ...item.toObject(),
        name: `${item.lastName} ${item.firstName}`
      }))))
    }
  }).populate({
    path: 'majorId',
    populate: {
      path: 'departmentId',
      model: 'Department'
    }
  });
})



/**
 * Xem thông tin tài khoản sinh viên. Chỉ những tài khoản đã đăng nhập mới thực hiện được chức năng này. Riêng tài khoản quyền admin hoặc tài khoản tự xem của bản thân sẽ xem được toàn bộ thông tin tài khoản.
 * @route GET /students/{id}
 * @group Student
 * @param {string} id.path.required ID của tài khoản sinh viên.
 * @returns {ListUsers.model} 200 - Thông tin tài khoản ứng với tài khoản đó.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
router.get('/:id', auth.isUser, async (req, res) => {
  try {
    let userResponse = await User.findOne({ userId: req.params.id, role: 'student' }).populate({
      path: 'majorId',
      populate: {
        path: 'departmentId',
        model: 'Department'
      }
    });
    if (!userResponse) {
      res.status(404).send(ResponseUtil.makeMessageResponse(stringMessage.user_not_found))
    }
    else {
      userResponse = userResponse.toObject()
      userResponse.name = `${userResponse.lastName} ${userResponse.firstName}`
      if ((req.user.role !== "admin") && req.user.id !== req.params.id) {
        userResponse = userUtil.hideUserInfo(userResponse);
      }
      res.status(200).send(ResponseUtil.makeResponse(userResponse));
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(ResponseUtil.makeMessageResponse(error.message))
  }
})


/**
 * Xem thông tin lớp của một sinh viên. Chỉ những tài khoản đã đăng nhập mới thực hiện được chức năng này. Chỉ tài khoản admin hoặc tài khoản chủ sở hữu mới dùng được chức năng này.
 * @route GET /students/{id}/class
 * @group Student
 * @param {string} id.path.required ID của tài khoản sinh viên.
 * @returns {ListClasses.model} 200 - Thông tin tài khoản ứng với tài khoản đó.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
router.get('/:id/class', auth.isUser, async (req, res) => {
  try {
    let userResponse = await User.findOne({ userId: req.params.id, role: 'student', status: { $ne: STATUS.DELETED } })
    if (!userResponse) {
      res.status(404).send(ResponseUtil.makeMessageResponse(stringMessage.user_not_found))
    }
    else {
      if ((req.user.role !== "admin") && req.user.userId !== req.params.id) {
        return res.status(401).send(ResponseUtil.makeMessageResponse(stringMessage.not_auth));
      }
      res.status(200).send(ResponseUtil.makeResponse(await getAllSubjectsOfStudent(userResponse)));
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(ResponseUtil.makeMessageResponse(error.message))
  }
})

module.exports = router;