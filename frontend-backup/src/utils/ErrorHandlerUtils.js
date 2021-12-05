import _ from 'lodash'
import DisplayUtils from './DisplayUtils'
import URLUtils from './URLUtils'
import { FE_ROUTE, HTTP_ERROR_CODE } from '../config'

export default class ErrorHandlerUtils {
  static extractErrorMessage(error) {
    // Case 1:  when Backend return error by "throw new Error("error message")
    //          then error.response.data == {"error": "error message"}
    // Case 2:  not often, when do some validation in backend
    //          then error.response.data == {"error": {"field_1: "error 1", "field_2": "error 2"}}
    // Case 3:  when Backend stopped or unexpected exceptions which are not handled by Backend code
    let errorMessage = _.get(error, 'response.data.error', null)

    // Case 1 & 2
    if (errorMessage) {
      if (_.isObject(errorMessage)) {
        // case 2
        errorMessage = _.get(errorMessage, _.keys(errorMessage)[0], 'Unknown error')
      }
      // else: Case 1
    } // Case 3, for example "Network error"
    else errorMessage = error.message
    return errorMessage
  }

  static http(error) {
    // force user logout if admin change role
    const errorStatus = _.get(error, 'response.status', null)
    if (errorStatus && errorStatus === HTTP_ERROR_CODE.FORBIDDEN)
      URLUtils.moveToURL(FE_ROUTE.ERROR.FORBIDDEN_LOGOUT)
    DisplayUtils.showNotificationError(this.extractErrorMessage(error))
  }
}
