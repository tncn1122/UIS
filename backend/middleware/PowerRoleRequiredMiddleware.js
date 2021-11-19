import { HttpUtils, LoggerUtils } from "../utils"
import {
  AUDIT_LOG_ACTION,
  AUDIT_LOG_FORMAT, AUDIT_LOG_STATUS,
  HTTP_ERROR_CODE,
  TEXT_VALIDATOR, USER_ROLE
} from '../config'

const currentFileName = require('path').basename(__filename)

// normally it will be always passed because we checked the role in Login stage
module.exports = (req, res, next) => {
  if (!req.currentUser.role.includes(USER_ROLE.POWER_USER)) {
    LoggerUtils.errorAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.LOGIN, AUDIT_LOG_STATUS.UNAUTHORIZED)
    return HttpUtils.errorResponse(res, TEXT_VALIDATOR.ERROR_FORBIDDEN, HTTP_ERROR_CODE.FORBIDDEN)
  }
  next()
}
