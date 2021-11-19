import {CryptoUtils, LoggerUtils, MailUtils, ValidationUtils} from '../../utils'
import {TEXT_VALIDATOR, USER_STATUS, AUDIT_LOG_ACTION, AUDIT_LOG_FORMAT, AUDIT_LOG_STATUS} from '../../config'
import UserModel from '../../service/user/modelUser'

const currentFileName = require('path').basename(__filename)

module.exports = {
  async registration(data) {
    const { userId, action } = CryptoUtils.decryptJWT(data.token)
    const auditAction = `${AUDIT_LOG_ACTION.ACTIVATE}_${AUDIT_LOG_ACTION.REGISTER}`
    const auditPayload = {userId}
    if (action !== AUDIT_LOG_ACTION.REGISTER) {
      LoggerUtils.errorAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, auditAction, AUDIT_LOG_STATUS.INVALID_ACTION, auditPayload)
      throw new Error(TEXT_VALIDATOR.ERROR_FORBIDDEN)
    }
    const user = await UserModel.getById(userId)
    if (!user) {
      LoggerUtils.errorAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, auditAction, AUDIT_LOG_STATUS.INVALID_TOKEN, auditPayload)
      throw new Error(TEXT_VALIDATOR.ACTIVATE_TOKEN_INVALID)
    }
    if (user.status === USER_STATUS.ACTIVE) {
      LoggerUtils.errorAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, auditAction, AUDIT_LOG_STATUS.INVALID_STATUS, auditPayload)
      throw new Error(TEXT_VALIDATOR.ACCOUNT_HAD_BEEN_ACTIVATED)
    }
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, auditAction, AUDIT_LOG_STATUS.SUCCESS, auditPayload)
    UserModel.updateById(userId, {status: USER_STATUS.ACTIVE})
    // todo: MailUtils.activate(user)
  },

  async forgotPassword(data) {
    const { password, passwordConfirm, token } = data
    const { userId, action } = CryptoUtils.decryptJWT(token)
    // if error, then it will happen in decryptJWT
    // so now, token is valid
    const auditAction = `${AUDIT_LOG_ACTION.ACTIVATE}_${AUDIT_LOG_ACTION.FORGOT_PASSWORD}`
    const auditPayload = {userId}
    if (action !== AUDIT_LOG_ACTION.FORGOT_PASSWORD) {
      LoggerUtils.errorAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, auditAction, AUDIT_LOG_STATUS.INVALID_ACTION, auditPayload)
      throw new Error(TEXT_VALIDATOR.ERROR_FORBIDDEN)
    }

    // if both password are null, then it is a "user-click activation link in email"
    if (ValidationUtils.empty(password) && ValidationUtils.empty(passwordConfirm))
      return

    // if has password, then it is a POST from change password form
    if (ValidationUtils.empty(password) || ValidationUtils.empty(passwordConfirm))
      throw new Error(JSON.stringify({
        password: TEXT_VALIDATOR.INVALID_PAYLOAD
      }))
    if (password !== passwordConfirm)
      throw new Error(JSON.stringify({
        password: TEXT_VALIDATOR.PASSWORD_UNMATCHED
      }))
    const passwordValidation = ValidationUtils.isWeakPassword(password)
    if (passwordValidation)
      throw new Error(passwordValidation)

    const user = await UserModel.getById(userId)
    if (ValidationUtils.empty(user)){
      LoggerUtils.errorAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, auditAction, AUDIT_LOG_STATUS.FAILED, auditPayload)
      throw new Error(TEXT_VALIDATOR.INVALID_LOGIN_CREDENTIALS)
    }
    const hash = await CryptoUtils.cryptSecret(password)
    user.password = hash
    user.save()
    // send mail to user
    MailUtils.changePassword(user)
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, auditAction, AUDIT_LOG_STATUS.SUCCESS, {email: user.email})
    return true
  }
}