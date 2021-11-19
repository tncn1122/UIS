import owasp from 'owasp-password-strength-test'
import validator from 'validator'
import _ from 'lodash'
import { TEXT_VALIDATOR } from "../config";

export default class ValidationUtils {

  static isString(val){
    return typeof val === 'string' || val instanceof String
  }

  static empty(value) {
    // undefined, null, {}, ''
    // return _.isEmpty(obj) : not work with boolean or integer
    // https://medium.com/@trmaphi/lodash-isempty-value-you-might-be-using-it-the-wrong-way-d83210d7decf
    if (Array.isArray(value))
      return false
    return (
      value === undefined ||
      value === null ||
      value === NaN ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
    )
  }

  static email(email) {
    return validator.isEmail(email)
  }

  static isWeakPassword(passwd) {
    owasp.config({
      allowPassphrases       : false,
      maxLength              : 128,
      minLength              : 8,
      minOptionalTestsToPass : 4
    })
    const result = owasp.test(passwd)
    const errors = {
      'The password must be at least 8 characters long.': TEXT_VALIDATOR.PASSWORD_AT_LEAST_8_LENGTH,
      'The password must contain at least one uppercase letter.': TEXT_VALIDATOR.PASSWORD_AT_LEAST_1_UPPER_CASE,
      'The password must contain at least one number.': TEXT_VALIDATOR.PASSWORD_AT_LEAST_1_NUMBER,
      'The password must contain at least one special character.': TEXT_VALIDATOR.PASSWORD_AT_LEAST_1_SPECIAL_CHAR,
      'The password may not contain sequences of three or more repeated characters.': TEXT_VALIDATOR.PASSWORD_MAY_NOT_CONTAIN_SEQUENCES
    }
    if (result.errors.length > 0){
      return errors[result.errors[0]] || result.errors[0]
    }
    else
      return ''
  }

}
