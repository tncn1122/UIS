/** Error handler middleware:  handle "throw Error()"
    Handle unexpected or non-trycatch exceptions
    note: if return in a Promise, then need "then().catch()", not catch in here

    -- for ex: service/user/handler (2021.08.20 revision)
    -- this won't catch
    async createUser(data){
        ...
        if ()
            throw new Error("error")
        const user = await UserModel.create()
        return user
    }

    -- this will catch
    createUser(data){
        ...
        if ()
            throw new Error("error")
        return UserModel.create()
    }

 */

import { HttpUtils, LoggerUtils, ErrorHandlerUtils } from "../utils"
import { DELIMITER_MESSAGE_LOG_SESSION, HTTP_ERROR_CODE } from '../config'

const currentFileName = require('path').basename(__filename)

module.exports = (error, req, res, _) => {
    LoggerUtils.error(`[${currentFileName}]: Catch error: ${ErrorHandlerUtils.extractErrorMessage(error)}`)
    LoggerUtils.error(`[${currentFileName}]: ${error.stack}${DELIMITER_MESSAGE_LOG_SESSION}`)
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.SERVER_ERROR)
}
