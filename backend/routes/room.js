const auth = require('../middleware/auth');
const ResponseUtil = require('../util/Response');
var express = require('express');
const stringMessage = require('../value/string');
const { STATUS, ENUM_ROLE } = require('../value/model');
const Room = require('../models/Room');
const Major = require('../models/Major');
const router = express.Router()


/**
 * @typedef ListRooms
 * @property {integer} count.required - số lượng phần tử
 * @property {Array.<Room>} data.required - các phần tử
 */


/**
 * Get tất cả các khoa hiện có.
 * @route GET /rooms/
 * @group Room
 * @returns {ListRooms.model} 200 - Thông tin khoa.
 * @returns {Error.model} 500 - Lỗi.
 * @security Bearer
 */
router.get('/', auth.isUser, async (req, res) => {
  const user = req.user
  let query = { status: { $ne: STATUS.DELETED } }
  if (user.role === ENUM_ROLE[0]) { // admin
    query = {}
  }

  Room.find({ ...query }, function (err, rooms) {
    if (err) {
      res.status(500).send(ResponseUtil.makeMessageResponse(err))
    }
    else {
      res.status(200).send(ResponseUtil.makeResponse(rooms))
    }
  });
})


/**
 * Tạo khoa. Chỉ tài khoản quyền ADMIN mới thực hiện được chức năng này.
 * @route POST /rooms/
 * @group Room
 * @param {Room.model} room.body.required - Body là file json chứa thông tin khoa.
 * @returns {ListRooms.model} 200 - Thông tin khoa.
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
router.post('/', auth.isAdmin, async (req, res) => {
  try {
    let roomInfo = req.body
    const room = new Room(roomInfo)
    await room.save()
    res.status(201).send(ResponseUtil.makeResponse(room));
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
 * @route PUT /rooms/{id}
 * @group Room
 * @param {string} id.path.required - Body là file json chứa thông tin khoa.
 * @param {Room.model} room.body.required - Body là file json chứa thông tin khoa.
 * @returns {ListRooms.model} 200 - Thông tin khoa.
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
router.put('/:id', auth.isAdmin, async (req, res) => {
  try {
    let roomInfo = req.body
    let roomId = req.params.id
    await Room.findOneAndUpdate({ roomId, status: { $ne: STATUS.DELETED } }, roomInfo, { runValidators: true }, function (error, raw) {
      if (!error) {
        if (raw) {
          raw.save();
          res.status(201).send(ResponseUtil.makeResponse(raw));
        }
        else {
          return res.status(404).send(ResponseUtil.makeMessageResponse(stringMessage.room_not_found));
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
 * @route DELETE /rooms/{id}
 * @group Room
 * @param {string} id.path.required - Id của khoa.
 * @returns {ListRooms.model} 200 - Thông tin khoa.
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
router.delete('/:id', auth.isAdmin, async (req, res) => {
  try {
    let roomId = req.params.id
    await Room.findOneAndUpdate({ roomId, status: { $ne: STATUS.DELETED } }, { status: STATUS.DELETED }, { runValidators: true }, function (error, raw) {
      if (!error) {
        if (raw) {
          raw.save();
          res.status(201).send(ResponseUtil.makeResponse(raw));
        }
        else {
          return res.status(404).send(ResponseUtil.makeMessageResponse(stringMessage.room_not_found));
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