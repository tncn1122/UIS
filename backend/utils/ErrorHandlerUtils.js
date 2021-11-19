import _ from 'lodash'
import { ValidationErrorItem } from 'sequelize'
import ValidationUtils from "./ValidationUtils";

export default class ErrorHandlerUtils {

  static extractErrorMessage(error){
    if (ValidationUtils.isString(error))
      return error
    let errorMessage = null
    if (_.has(error, 'errors')){ // sequelize list of ValidationErrorItems
      let errorObject = {}
      error.errors.forEach((obj, idx) => {
        if (obj instanceof ValidationErrorItem){
          errorObject[obj.path] = obj.message
        }
      })
      errorMessage = JSON.stringify(errorObject)
    } else if (_.get(error, 'message', null))// catch when "throw new Error("error message")
      errorMessage = error.message
    else
      errorMessage = error
    return errorMessage
  }
}
