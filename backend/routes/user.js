const auth = require('../middleware/auth');
const ErrorUtil = require('../util/ErrorUtil');
const ResponseUtil = require('../util/Response');
var express = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const stringMessage = require('../value/string');
const QR = require('../util/QR')
const router = express.Router()
const userUtil = require('../util/UserUtils');
const Major = require('../models/Major');
const { major_not_found, user_exist } = require('../value/string');
const { STATUS } = require('../value/model');

/**
 * @typedef Login
 * @property {string} id.required - username
 * @property {string} password.required - password
 */

/**
 * @typedef ListUsers
 * @property {integer} count.required - số lượng phần tử
 * @property {Array.<User>} data.required - các phần tử
 */


/**
 * Get tất cả tài khoản hiện có. Chỉ có tài khoản quyền Admin mới thực hiện được chức năng này.
 * @route GET /users/
 * @group User
 * @returns {ListUsers.model} 200 - Thông tin tài khoản và token ứng với tài khoản đó.
 * @returns {Error.model} 500 - Lỗi.
 * @security Bearer
 */
router.get('/', auth.isAdmin, async (req, res) => {
  User.find({}, function (err, users) {
    //console.log(users);
    if (err) {
      res.status(500).send(ResponseUtil.makeMessageResponse(error.message))
    }
    else {
      res.status(200).send(ResponseUtil.makeResponse(users.map(item => ({
        ...item,
        name: `${item.lastName} ${item.firstName}`
      }))))
    }
  });
})


/**
 * Tạo tài khoản. Chỉ có tài khoản có quyền Admin mới thực hiện được chức năng này.
 * @route POST /users/
 * @group User
 * @param {User.model} user.body.required - Body là file json chứa thông tin user, những mục không bắt buộc (class, qrUrl, token) có thể không cần gửi trong json. Role thuộc một trong các từ ["admin", "teacher", "student"].
 * @returns {ListUsers.model} 200 - Thông tin tài khoản và token ứng với tài khoản đó.
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
router.post('/', auth.isAdmin, async (req, res) => {
  // Create a new user
  try {
    let userInfo = req.body;
    const userMajor = await Major.findOne({ majorId: userInfo.majorId, status: { $ne: STATUS.DELETED } }).populate('departmentId')
    if (!userMajor) {
      throw new Error(major_not_found)
    }
    userInfo.majorId = userMajor
    userInfo.avtUrl = "";

    const user = new User(userInfo);
    const uniqueId = await user.isUnique(userInfo.userId)

    if (uniqueId) {
      throw new Error(user_exist)
    }

    user.qrUrl = QR.createQR(user.userId)
    await user.generateAuthToken();
    await user.save();
    res.status(201).send(ResponseUtil.makeResponse(user));
  } catch (error) {
    console.log(error);
    if (error.code == 11000) {
      return res.status(400).send(ResponseUtil.makeMessageResponse(ErrorUtil.makeErrorValidateMessage(JSON.stringify(error.keyValue))));
    }
    res.status(400).send(ResponseUtil.makeMessageResponse(error.message))
  }
})


/**
 * Xem thông tin tài khoản. Chỉ những tài khoản đã đăng nhập mới thực hiện được chức năng này. Riêng tài khoản quyền admin hoặc tài khoản tự xem của bản thân sẽ xem được toàn bộ thông tin tài khoản.
 * @route GET /users/{id}
 * @group User
 * @param {string} id.path.required ID của tài khoản người dùng.
 * @returns {ListUsers.model} 200 - Thông tin tài khoản ứng với tài khoản đó.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
router.get('/:id', auth.isUser, async (req, res) => {
  try {
    let userResponse = await findUser(req.params.id)
    if (!userResponse) {
      res.status(404).send(ResponseUtil.makeMessageResponse(stringMessage.user_not_found))
    }
    else {
      userResponse = userResponse.toObject()
      const { majorId } = userResponse
      const departmentId = majorId?.departmentId || {}
      userResponse.departmentName = departmentId?.name || '-'
      userResponse.majorName = majorId?.name || '-'
      userResponse.name = `${userResponse.lastName} ${userResponse.firstName}`
      if ((req.user.role !== "admin") && req.user.userId !== req.params.id) {
        userResponse = await userUtil.hideUserInfo(userResponse);
      }
      res.status(200).send(ResponseUtil.makeResponse(userResponse));
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(ResponseUtil.makeMessageResponse(error.message))
  }
})

/**
 * Chỉnh sửa thông tin tài khoản. Chỉ những tài khoản đã đăng nhập mới thực hiện được. Một tài khoản chỉ có thể thay đổi thông tin của chính tài khoản đó. Admin có thể thay đổi thông tin của tài khoản khác.
 * @route PUT /users/{id}
 * @group User
 * @param {string} id.path.required - ID của tài khoản.
 * @param {UserInfo.model} user.body.required - User với quyền thông thường chỉ có thể sửa các thông tin như ở Body mẫu. Body put lên có thể không chứa đủ các trường như dưới mẫu, nhưng chỉ có những trường đó có thể thay đổi (những trường khác VD: id, password,..) có thể gửi lên nhưng sẽ không bị thay đổi.
 * @returns {ListUsers.model} 201 - Thông tin tài khoản đã chỉnh sửa và token ứng với tài khoản đó.
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
router.put('/:id', auth.isUser, async (req, res) => {
  // seft update user info
  try {
    let userUpdate = req.body;
    let user = req.user;
    let user_id = req.params.id;
    userUtil.onlyAdminAndOwner(user, user_id);
    delete userUpdate['password'];
    delete userUpdate['role'];
    delete userUpdate['token'];
    delete userUpdate['classes'];
    delete userUpdate['_id'];
    delete userUpdate['__v'];
    const userMajor = await Major.findOne({ majorId: userUpdate.majorId, status: { $ne: STATUS.DELETED } }).populate('departmentId')
    if (!userMajor) {
      throw new Error(major_not_found)
    }
    userUpdate.majorId = userMajor

    const uniqueId = await findUser(userUpdate.userId)
    if(uniqueId){
      throw new Error(user_exist)
    }

    await User.findOneAndUpdate({ userId: user_id, status: { $ne: STATUS.DELETED } }, userUpdate, { runValidators: true }, async function (error, raw) {
      if (!error) {
        if (raw) {
          await raw.save();
          res.status(201).send(ResponseUtil.makeResponse(raw));
        }
        else {
          return res.status(404).send(ResponseUtil.makeMessageResponse(stringMessage.user_not_found));
        }
      }
      else {
        res.status(400).send(ResponseUtil.makeMessageResponse(error.message));
      }
    }).populate({
      path: 'majorId',
      populate: {
        path: 'departmentId',
        model: 'Department'
      }
    });
  } catch (error) {
    console.log(error);
    if (error.code == 11000) {
      res.status(400).send(ResponseUtil.makeMessageResponse(ErrorUtil.makeErrorValidateMessage(JSON.stringify(error.keyValue))));
    }
    else {
      res.status(400).send(ResponseUtil.makeMessageResponse(error.message));
    }

  }
})


/**
 * Chỉnh sửa mật khẩu tài khoản. Chỉ những tài khoản đã đăng nhập mới thực hiện được. Một tài khoản chỉ có thể thay đổi thông tin của chính tài khoản đó. Admin có thể sửa mật khẩu của người khác.
 * @route PUT /users/{id}/password
 * @group User
 * @param {string} id.path.required - Id của tài khoản.
 * @param {PasswordChange.model} password.body.required - Mật khẩu mới của tài khoản.
 * @returns {ListUsers.model} 200 - Thông tin tài khoản đã chỉnh sửa và token ứng với tài khoản đó.
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
router.put('/:id/password', auth.isUser, async (req, res) => {
  // seft update user info
  try {
    let userUpdate = req.body;
    let current_user = req.user;
    let user_id = req.params.id;
    userUtil.onlyAdminAndOwner(current_user, user_id)



    if (current_user.role !== 'admin') {
      // check if old password is correct  
      const user = await User.findByCredentials(current_user.userId, userUpdate.old_password)
      if (!user) {
        return res.status(401).send(ResponseUtil.makeMessageResponse(stringMessage.wrong_password));
      }
    }
    else {
      current_user = await User.findOne({ userId: user_id }).populate({
        path: 'majorId',
        populate: {
          path: 'departmentId',
          model: 'Department'
        }
      });
      if (!current_user) {
        return res.status(401).send(ResponseUtil.makeMessageResponse(stringMessage.user_not_found));
      }
    }

    // validate pass
    const new_password = userUpdate.password || "";
    userUtil.passwordValidate(new_password);

    // update password
    current_user.password = await bcrypt.hash(new_password, 8);
    await User.findByIdAndUpdate(current_user._id, current_user, function (err, raw) {
      if (!err) {
        res.status(201).send(ResponseUtil.makeResponse(raw));
      }
      else {
        res.status(400).send(ResponseUtil.makeMessageResponse(error.message));
      }
    });


  } catch (error) {
    console.log(error);
    res.status(400).send(ResponseUtil.makeMessageResponse(error.message))

  }
})

/**
 * Post thông tin để đăng nhập vào hệ thống. Không yêu cầu quyền khi đăng nhập.
 * @route POST /users/login
 * @group User
 * @param {Login.model} login.body.required - Thông tin đăng nhập.
 * @returns {ListUsers.model} 200 - Thông tin tài khoản kèm token ứng với tài khoản đó.
 * @returns {Error.model} 400 - Thông tin tài khoản gửi lên sai.
 */
router.post('/login', async (req, res) => {
  //Login a registered user
  try {
    const { id, password } = req.body
    if (id && password) {
      const user = await User.findByCredentials(id, password)
      if (!user) {
        return res.status(400).send(ResponseUtil.makeMessageResponse(stringMessage.invalid_credentials));
      }
      await user.generateAuthToken()
      res.send(ResponseUtil.makeResponse(user))
    }
    else {
      res.status(400).send(ResponseUtil.makeMessageResponse(stringMessage.invalid_credentials));
    }
  } catch (error) {
    //TODO
    console.log(error);
    res.status(400).send(ResponseUtil.makeMessageResponse(error.message))
  }
})

/**
 * Đăng xuất khỏi hệ thống. Chỉ những tài khoản đã đăng nhập mới thực hiện được. Sau khi post thành công token của user sẽ bị xóa.
 * @route POST /users/logout
 * @group User
 * @returns {Error.model} 200 - Success nếu thao tác thành công.
 * @returns {Error.model} 500 - Lỗi.
 * @security Bearer
 */
router.post('/logout', auth.isUser, async (req, res) => {
  //Login a registered user
  try {
    req.user.token = "";
    await req.user.save();
    res.status(200).send(ResponseUtil.makeMessageResponse());
  } catch (error) {
    //console.log(error);
    //TODO
    res.status(500).send(ResponseUtil.makeMessageResponse(error.message))
  }
})


router.get('/admin/reset', async (req, res) => {
  console.log("resetpass");
  try {
    const user = await User.findOne({ id: "admin" });
    if (user) {
      user.password = "admin";
      user.save();
    }
    else {
      const newUser = new User({
        "id": "admin",
        "name": "admin",
        "email": "admin@gmail.com",
        "password": "admin",
        "role": "admin",
      })
      newUser.save()
    }
    res.status(200).send(ResponseUtil.makeMessageResponse())
  }
  catch (err) {
    res.status(500).send(ResponseUtil.makeMessageResponse(error.message))
  }
})

/**
 * Xóa một user khỏi hệ thống dựa vào ID, chỉ có Admin mới thực hiện được chức năng này.
 * @route DELETE /users/{id}
 * @group User
 * @param {string} id.path.required ID của tài khoản cần xóa.
 * @returns {Error.model} 200 - "Xóa thành công!" nếu thao tác thành công.
 * @returns {Error.model} 500 - Lỗi.
 * @security Bearer
 */
router.delete('/:id', auth.isAdmin, async (req, res) => {
  try {
    let userId = req.params.id;
    const user = await User.findOne({ userId, status: { $ne: STATUS.DELETED } });
    if (user) {
      // if (user.classes.length > 0) {
      //   res.status(200).send(ResponseUtil.makeMessageResponse(stringMessage.user_cant_delete_bc_delete))
      // }
      await User.findOneAndUpdate({ userId, status: { $ne: STATUS.DELETED } }, { status: STATUS.DELETED }, { runValidators: true }, function (error, raw) {
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
      }).populate({
        path: 'majorId',
        populate: {
          path: 'departmentId',
          model: 'Department'
        }
      });
      // res.status(200).send(ResponseUtil.makeMessageResponse(stringMessage.deleted_successfully))
    }
    else {
      res.status(404).send(ResponseUtil.makeMessageResponse(stringMessage.user_not_found))
    }

  }
  catch (err) {
    console.log(err)
    res.status(500).send(ResponseUtil.makeMessageResponse(error.message))
  }
})

router.get('/database/delete/:role', async (req, res) => {
  try {
    let role = req.params.role;
    await User.deleteMany({ role: role })
    res.status(200).send(ResponseUtil.makeMessageResponse("Delete " + role + " success"))
  }
  catch (err) {
    log(err)
    res.status(500).send(ResponseUtil.makeMessageResponse(error.message))
  }
})



async function findUser(userId) {
  return await User.findOne({ userId, status: { $ne: STATUS.DELETED } }).populate({
    path: 'majorId',
    populate: {
      path: 'departmentId',
      model: 'Department'
    }
  });
}


module.exports = router;

