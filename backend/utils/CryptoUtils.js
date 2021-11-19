import randomstring from 'randomstring'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import jsBase64 from 'js-base64'
const { config } = require('../config/loadConfig')

export default class CryptoUtils {

  static cryptSecret(password) {
    return new Promise((resolve, reject) => {
      const saltRound = 10
      bcrypt.genSalt(saltRound, (err, salt) => {
        if (err) return reject(err)
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) return reject(err)
          return resolve(hash)
        })
      })
    })
  }

  static verifySecret(plainText, hash) {
    return bcrypt.compare(plainText, hash)
  }

  static generateJWT(data, expiresIn=config.get('jwtExpiredInterval')) {
    return jwt.sign(data, config.get('jwtSecretKey'), { expiresIn })
  }

  static decryptJWT(data) {
    return jwt.verify(data, config.get('jwtSecretKey'))
  }

  static encodeBase64(txt) {
    return jsBase64.encode(txt)
  }

  static decodeBase64(txt) {
    return jsBase64.decode(txt)
  }

  static generateRandomToken(size=config.get('securityTokenLength')) {
    return randomstring.generate({ length: size })
  }

}
