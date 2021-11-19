const router = Router()
import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import {AUDIT_LOG_ACTION, AUDIT_LOG_FORMAT, AUDIT_LOG_STATUS, TEXT_VALIDATOR, URL} from '../../config'
import {DateTimeUtils, HttpUtils, LoggerUtils} from '../../utils'
import { HTTP_ERROR_CODE } from '../../config'
import UserController from '../../service/user/controllerUser'

const currentFileName = require('path').basename(__filename)

// create storage to save avatar file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, URL.USER_AVATAR.FOLDER)
  },
  filename: function (req, file, cb) {
    cb(
      null,
      // rename file to <userId-timeStamp>.png|jpeg....
      req.currentUser.id + '-' + DateTimeUtils.currentTimestamp() + path.extname(file.originalname)
    )
  },
});
const upload = multer({ storage })

// get user information
// return {
//   userProfile: ....,
//   userWorkExperience: .....,
//   userEducation: .....
// }
router.get('/', (req, res, next) => {
  // we can get full user object by req.currentUser
  UserController.getUserWithLatestInformation(req.currentUser.id).then((data) => {
    return HttpUtils.jsonResponse(res, data);
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
});

// update user information
// body = {
//   userProfile: ....,
//   userWorkExperiment: .....,
//   userEducation: .....
// }
router.put('/', (req, res, next) => {
  UserController.updateUserInformation(req.currentUser.id, req.body).then((data) => {
    return HttpUtils.jsonResponse(res);
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
});

// get all uploaded avatars of user
router.get('/avatar', (req, res, next) => {
  UserController.getUploadedAvatars(req.currentUser.id).then((data) => {
    return HttpUtils.jsonResponse(res, data);
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

// upload new avatar
router.post('/avatar', upload.any(), (req, res, next) => {
  UserController.uploadUserAvatar(req.currentUser.id, req.files).then((data) => {
    return HttpUtils.jsonResponse(res);
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

// set new avatar from uploaded avatar (include default avatar)
router.put('/avatar', (req, res, next) => {
  UserController.setAvatar(req.currentUser.id, req.body).then((data) => {
    return HttpUtils.jsonResponse(res, data);
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

// delete one of uploaded avatar
router.delete('/avatar', (req, res, next) => {
  UserController.deleteUploadedAvatar(req.currentUser.id, req.query).then((data) => {
    return HttpUtils.jsonResponse(res);
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

// change password
router.post('/change-password', (req, res) => {
  UserController.changePassword(req.currentUser, req.body).then((data) => {
    return HttpUtils.jsonResponse(res);
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

// forgot password in user profile view
router.post('/forgot-password', (req, res) => {
  const { username_email } = req.body
  const currentUser = req.currentUser
  if ((currentUser.email !== username_email) && (currentUser.username !== username_email)){
    LoggerUtils.errorAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.FORGOT_PASSWORD, AUDIT_LOG_STATUS.FAILED, {email: currentUser.email, requested_email: username_email})
    throw new Error(TEXT_VALIDATOR.INVALID_LOGIN_CREDENTIALS)
  }
  UserController.forgotPassword(req.body).then((data) => {
    return HttpUtils.jsonResponse(res);
  })
})

// get all teams that include this user
router.get('/team', (req, res, next) => {
  UserController.getTeams(req.currentUser.id).then((data) => {
    return HttpUtils.jsonResponse(res, data);
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

module.exports = router;
