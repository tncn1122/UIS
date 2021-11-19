const { DataTypes } = require('sequelize')
import { TEXT_VALIDATOR, USER_STATUS, USER_ROLE, CONST_VALIDATOR } from '../../config'
import { ValidationUtils, CryptoUtils } from '../../utils'

module.exports = (dbConnection) => dbConnection.define(
  'User',
  {
    username: {
      type: DataTypes.STRING,
      // we won't use it, we make isUnique in order to make the custom error message
      // unique: true,
      notEmpty: true,
      allowNull: false,
      validate: {
        len: {
          args: [CONST_VALIDATOR.USER_INFO_MIN_LENGTH, CONST_VALIDATOR.USER_INFO_MAX_LENGTH],
          msg: TEXT_VALIDATOR.USER_INFO_MUST_IN_RANGE
        },
        isUnique(value) {
          // must be in here, can't be on the top
          const User = require('../../config/dbMaster')['User']
          return User.findOne({ where: { username: value } }).then((user) => {
            if (user) {
              throw new Error(TEXT_VALIDATOR.USERNAME_EXIST)
            }
          })
          // cannot have .catch() because it will prevent the Error sent to upper nodes
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
      // we won't use it, we make isValidEmail in order to make the unified validation with Front-End
      // isEmail: true,
      validate: {
        len: {
          args: [CONST_VALIDATOR.USER_INFO_MIN_LENGTH, CONST_VALIDATOR.USER_INFO_MAX_LENGTH],
          msg: TEXT_VALIDATOR.USER_INFO_MUST_IN_RANGE
        },
        isValidEmail(value) {
          if (!ValidationUtils.email(value))
            throw new Error(TEXT_VALIDATOR.INVALID_EMAIL_FORMAT)
        },
        isUnique(value) {
          // must be in here, can't be on the top
          const User = require('../../config/dbMaster')['User']
          return User.findOne({ where: { email: value } }).then((user) => {
            if (user) {
              throw new Error(TEXT_VALIDATOR.EMAIL_EXIST)
            }
          })
          // cannot have .catch() because it will prevent the Error sent to upper nodes
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
      validate: {
        isValidPassword(value) {
          const passwordValidation = ValidationUtils.isWeakPassword(value)
          if (passwordValidation)
            throw new Error(passwordValidation)
        }
      }
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: USER_STATUS.INACTIVE
      // todo: add validate if value is in USER_STATUS or not
    },
    // normal user (code tour user view):  user
    // power user (admin view): user,power
    // admin (admin view): user,power,admin
    role: {
      type: DataTypes.STRING,
      defaultValue: USER_ROLE.USER
    },
  },
  {
    tableName: 'user',
    // timestamps: true,
    // // I don't want createdAt
    // createdAt: false,
    // // I want updatedAt to actually be called updateTimestamp
    // updatedAt: 'updateTimestamp'
    hooks: {
      beforeCreate: (user, options) => {
        return CryptoUtils.cryptSecret(user.password)
          .then((hash) => {
            user.password = hash
          })
          .catch(err => {
            throw err
          })
      }
    },
  }
)

    // // Adding an class level methods.
    // User.verifyPassword = (user, password) => {
    //     return CryptoUtils.verifySecret(password, user.password)
    // };

    // Adding an instance level methods : DOESN'T WORK
    // ref more:
    //  - https://sequelize.org/master/manual/model-basics.html#taking-advantage-of-models-being-classes
    //  - https://sequelizedocs.fullstackacademy.com/instance-and-class-methods/
    //  - https://stackoverflow.com/questions/52937747/how-to-add-an-instance-method-in-sequelize-model
    //  - https://stackoverflow.com/questions/37115441/sequelize-instance-methods-not-working
    // User.prototype.verifyPassword = (user, password) => {
    //     return CryptoUtils.verifySecret(password, user.password)
    // };

