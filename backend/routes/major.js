const auth = require('../middleware/auth');
const ResponseUtil = require('../util/Response');
var express = require('express');
const stringMessage = require('../value/string');
const Major = require('../models/Major');
const { STATUS, ENUM_ROLE } = require('../value/model');
const Department = require('../models/Department');
const { department_not_found } = require('../value/string');
const router = express.Router()


/**
 * @typedef ListMajors
 * @property {integer} count.required - số lượng phần tử
 * @property {Array.<Major>} data.required - các phần tử
 */


/**
 * Get tất cả tài khoản teacher hiện có.
 * @route GET /majors/
 * @group Major
 * @returns {ListMajors.model} 200 - Thông tin tài khoản và token ứng với tài khoản đó.
 * @returns {Error.model} 500 - Lỗi.
 * @security Bearer
 */
router.get('/', auth.isUser, async (req, res) => {
  const user = req.user
  let query = {status: {$ne: STATUS.DELETED}}
  if(user.role === ENUM_ROLE[0]){ // admin
    query = {}
  }
  Major.find({...query}, function (err, majors) {
    if (err) {
      res.status(500).send(ResponseUtil.makeMessageResponse(err))
    }
    else {
      console.log((majors));
      res.status(200).send(ResponseUtil.makeResponse(majors))
    }
  }).populate('departmentId');
})


/**
 * Tạo chuyên ngành. Chỉ tài khoản quyền ADMIN mới thực hiện được chức năng này.
 * @route POST /majors/
 * @group Major
 * @param {MajorInfo.model} majorInfo.body.required - Body là file json chứa thông tin khoa.
 * @returns {ListMajors.model} 200 - Thông tin khoa.
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
 router.post('/', auth.isAdmin, async (req, res) => {
  try {
    let majorInfo = req.body
    const department = await Department.findOne({departmentId: majorInfo.departmentId, status: {$ne: STATUS.DELETED}})
    if(!department){
      throw new Error(department_not_found)
    }
    const major = new Major({
      ...majorInfo,
      departmentId: department
    })
    await major.save()
    res.status(201).send(ResponseUtil.makeResponse(major));
  } catch (error) {
    console.log(error);
    if (error.code == 11000) {
      return res.status(400).send(ResponseUtil.makeMessageResponse(ErrorUtil.makeErrorValidateMessage(JSON.stringify(error.keyValue))));
    }
    res.status(400).send(ResponseUtil.makeMessageResponse(error.message))
  }
})


/**
 * Sửa thông tin chuyên ngành. Chỉ tài khoản quyền ADMIN mới thực hiện được chức năng này.
 * @route PUT /majors/{id}
 * @group Major
 * @param {string} id.path.required - Body là file json chứa thông tin chuyên ngành.
 * @param {Department.model} department.body.required - Body là file json chứa thông tin chuyên ngành.
 * @returns {ListMajors.model} 200 - Thông tin khoa.
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
 router.put('/:id', auth.isAdmin, async (req, res) => {
  try {
    let majorInfo = req.body
    let majorId = req.params.id
    const department = await Department.findOne({departmentId: majorInfo.departmentId, status: {$ne: STATUS.DELETED}})
    if(!department){
      throw new Error(department_not_found)
    }

    majorInfo.departmentId = department
    await Major.findOneAndUpdate({ majorId, status: {$ne: STATUS.DELETED}}, majorInfo, { runValidators: true }, function (error, raw) {
      if (!error) {
        if (raw) {
          raw.save();
          res.status(201).send(ResponseUtil.makeResponse(raw));
        }
        else {
          return res.status(404).send(ResponseUtil.makeMessageResponse(stringMessage.major_not_found));
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
 * Xóa chuyên ngành. Chỉ tài khoản quyền ADMIN mới thực hiện được chức năng này.
 * @route DELETE /majors/{id}
 * @group Major
 * @param {string} id.path.required - Id của chuyên ngành.
 * @returns {ListDepartments.model} 200 - Thông tin chuyên ngành.
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
 router.delete('/:id', auth.isAdmin, async (req, res) => {
  try {
    let majorId = req.params.id
    console.log(majorId);
    await Major.findOneAndUpdate({ majorId, status: {$ne: STATUS.DELETED}}, {status: STATUS.DELETED}, { runValidators: true }, function (error, raw) {
      if (!error) {
        if (raw) {
          raw.save();
          res.status(201).send(ResponseUtil.makeResponse(raw));
        }
        else {
          return res.status(404).send(ResponseUtil.makeMessageResponse(stringMessage.major_not_found));
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