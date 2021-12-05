import owasp from 'owasp-password-strength-test'
import validator from 'validator'
import _ from 'lodash'
import { TEXT_VALIDATOR, CONST_VALIDATOR } from '../config'

export default class ValidationUtils {
  static empty(obj) {
    // undefined, null, {}, ''
    return _.isEmpty(obj)
  }

  static email(email) {
    if (this.empty(email)) return TEXT_VALIDATOR.TEXT_AT_LEAST_N_LENGTH
    return validator.isEmail(email)
  }

  static password(passwd) {
    if (this.empty(passwd)) return Promise.reject(new Error(TEXT_VALIDATOR.TEXT_AT_LEAST_N_LENGTH))

    owasp.config({
      allowPassphrases: false,
      maxLength: 128,
      minLength: 8,
      minOptionalTestsToPass: 4,
    })
    const result = owasp.test(passwd)
    const errors = {
      'The password must be at least 8 characters long.': TEXT_VALIDATOR.PASSWORD_AT_LEAST_8_LENGTH,
      'The password must contain at least one uppercase letter.':
        TEXT_VALIDATOR.PASSWORD_AT_LEAST_1_UPPER_CASE,
      'The password must contain at least one number.': TEXT_VALIDATOR.PASSWORD_AT_LEAST_1_NUMBER,
      'The password must contain at least one special character.':
        TEXT_VALIDATOR.PASSWORD_AT_LEAST_1_SPECIAL_CHAR,
      'The password may not contain sequences of three or more repeated characters.':
        TEXT_VALIDATOR.PASSWORD_MAY_NOT_CONTAIN_SEQUENCES,
    }
    if (result.errors.length > 0) {
      return Promise.reject(new Error(errors[result.errors[0]] || result.errors[0]))
    }
    return Promise.resolve()
  }

  static passwordConfirm(passwd, passwdConfirm) {
    if (this.empty(passwdConfirm) || passwd === passwdConfirm) {
      return Promise.resolve()
    }
    return Promise.reject(new Error(TEXT_VALIDATOR.PASSWORD_UNMATCHED))
  }

  static textUserInfo(info) {
    if (this.empty(info)) return Promise.reject(new Error(TEXT_VALIDATOR.TEXT_AT_LEAST_N_LENGTH))

    const txt = info.trim()
    let error = null
    if (txt.length < CONST_VALIDATOR.USER_INFO_MIN_LENGTH)
      error = TEXT_VALIDATOR.TEXT_AT_LEAST_N_LENGTH
    else if (txt.length > CONST_VALIDATOR.USER_INFO_MAX_LENGTH)
      error = TEXT_VALIDATOR.TEXT_MAX_N_LENGTH
    if (error) return Promise.reject(new Error(error))
    return Promise.resolve()
  }
}
