import _ from 'lodash'
import passport from 'passport'
import { config } from '../config/loadConfig'
import { HttpUtils, LoggerUtils, ValidationUtils } from "../utils"
import {
    AUDIT_LOG_ACTION,
    AUDIT_LOG_FORMAT, AUDIT_LOG_STATUS,
    HTTP_ERROR_CODE,
    TEXT_VALIDATOR
} from '../config'

const currentFileName = require('path').basename(__filename)

module.exports = (req, res, next) => {
    const accessToken = _.get(req.cookies, config.get('cookieAccessToken'), null)
    if (ValidationUtils.empty(accessToken)) {
        LoggerUtils.errorAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.LOGIN, AUDIT_LOG_STATUS.UNAUTHORIZED)
        return HttpUtils.errorResponse(res, TEXT_VALIDATOR.ERROR_FORBIDDEN, HTTP_ERROR_CODE.FORBIDDEN)
    } else {
        passport.authenticate('jwt', { session: false }, function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                LoggerUtils.errorAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.LOGIN, AUDIT_LOG_STATUS.UNAUTHORIZED, JSON.stringify(err))
                return HttpUtils.errorResponse(res, TEXT_VALIDATOR.ERROR_FORBIDDEN, HTTP_ERROR_CODE.FORBIDDEN)
            }
            req.currentUser = user
            next()
        })(req, res, next)
    }

}
