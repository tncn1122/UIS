const auth = require('../middleware/auth');
const ResponseUtil = require('../util/Response');
var express = require('express');
const stringMessage = require('../value/string');
const { STATUS, ENUM_ROLE } = require('../value/model');
const Department = require('../models/Department');
const Major = require('../models/Major');
const router = express.Router()


/**
 * @typedef ListDepartments
 * @property {integer} count.required - số lượng phần tử
 * @property {Array.<Department>} data.required - các phần tử
 */


/**
 * Get tất cả các khoa hiện có.
 * @route GET /departments/
 * @group Department
 * @returns {ListDepartments.model} 200 - Thông tin khoa.
 * @returns {Error.model} 500 - Lỗi.
 * @security Bearer
 */
router.get('/', auth.isUser, async (req, res) => {
  const user = req.user
  let query = { status: { $ne: STATUS.DELETED } }
  if (user.role === ENUM_ROLE[0]) { // admin
    query = {}
  }
  const listMajor = await Major.find({ status: { $ne: STATUS.DELETED } }).populate('departmentId')

  Department.find({ ...query }, function (err, departments) {
    if (err) {
      res.status(500).send(ResponseUtil.makeMessageResponse(err))
    }
    else {
      const dict = new Map()
      for (const item of listMajor) {
        if (!dict.has(item.departmentId.departmentId)) {
          dict.set(item.departmentId.departmentId, 0)
        }
        dict.set(item.departmentId.departmentId, dict.get(item.departmentId.departmentId) + 1) 
      }
      departments = departments.map(item => ({
        departmentId: item.departmentId,
        createdAt: item.createdAt,
        name: item.name,
        status: item.status,
        majorsCount: dict.get(item.departmentId) || 0
      }))
      res.status(200).send(ResponseUtil.makeResponse(departments))
    }
  });
})


/**
 * Tạo khoa. Chỉ tài khoản quyền ADMIN mới thực hiện được chức năng này.
 * @route POST /departments/
 * @group Department
 * @param {Department.model} department.body.required - Body là file json chứa thông tin khoa.
 * @returns {ListDepartments.model} 200 - Thông tin khoa.
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
router.post('/', auth.isAdmin, async (req, res) => {
  try {
    let departmentInfo = req.body
    const department = new Department(departmentInfo)
    await department.save()
    res.status(201).send(ResponseUtil.makeResponse(department));
  } catch (error) {
    console.log(error);
    if (error.code == 11000) {
      return res.status(400).send(ResponseUtil.makeMessageResponse(ErrorUtil.makeErrorValidateMessage(JSON.stringify(error.keyValue))));
    }
    res.status(400).send(ResponseUtil.makeMessageResponse(error.message))
  }
})


/**
 * Sửa thông tin khoa. Chỉ tài khoản quyền ADMIN mới thực hiện được chức năng này.
 * @route PUT /departments/{id}
 * @group Department
 * @param {string} id.path.required - Body là file json chứa thông tin khoa.
 * @param {Department.model} department.body.required - Body là file json chứa thông tin khoa.
 * @returns {ListDepartments.model} 200 - Thông tin khoa.
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
router.put('/:id', auth.isAdmin, async (req, res) => {
  try {
    let departmentInfo = req.body
    let departmentId = req.params.id
    await Department.findOneAndUpdate({ departmentId, status: { $ne: STATUS.DELETED } }, departmentInfo, { runValidators: true }, function (error, raw) {
      if (!error) {
        if (raw) {
          raw.save();
          res.status(201).send(ResponseUtil.makeResponse(raw));
        }
        else {
          return res.status(404).send(ResponseUtil.makeMessageResponse(stringMessage.department_not_found));
        }
      }
      else {
        res.status(400).send(ResponseUtil.makeMessageResponse(error.message));
      }
    });
  } catch (error) {
    console.log(error);
    if (error.code == 11000) {
      return res.status(400).send(ResponseUtil.makeMessageResponse(ErrorUtil.makeErrorValidateMessage(JSON.stringify(error.keyValue))));
    }
    res.status(400).send(ResponseUtil.makeMessageResponse(error.message))
  }
})


/**
 * Xóa khoa. Chỉ tài khoản quyền ADMIN mới thực hiện được chức năng này.
 * @route DELETE /departments/{id}
 * @group Department
 * @param {string} id.path.required - Id của khoa.
 * @returns {ListDepartments.model} 200 - Thông tin khoa.
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
router.delete('/:id', auth.isAdmin, async (req, res) => {
  try {
    let departmentId = req.params.id
    await Department.findOneAndUpdate({ departmentId, status: { $ne: STATUS.DELETED } }, { status: STATUS.DELETED }, { runValidators: true }, function (error, raw) {
      if (!error) {
        if (raw) {
          raw.save();
          res.status(201).send(ResponseUtil.makeResponse(raw));
        }
        else {
          return res.status(404).send(ResponseUtil.makeMessageResponse(stringMessage.department_not_found));
        }
      }
      else {
        res.status(400).send(ResponseUtil.makeMessageResponse(error.message));
      }
    });
  } catch (error) {
    console.log(error);
    if (error.code == 11000) {
      return res.status(400).send(ResponseUtil.makeMessageResponse(ErrorUtil.makeErrorValidateMessage(JSON.stringify(error.keyValue))));
    }
    res.status(400).send(ResponseUtil.makeMessageResponse(error.message))
  }
})



module.exports = router;