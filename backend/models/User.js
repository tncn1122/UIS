const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const stringMessage = require('../value/string')
const userUtil = require('../util/UserUtils')
const enumModel = require('../value/model')
const { CreateSchema } = require('./BaseSchema')
const { STATUS } = require('../value/model')

const modelName = 'User'

/**
 * @typedef UserInfo
 * @property {string} name
 * @property {string} email
 * @property {string} qrUrl
 * @property {string} avtUrl
 */

/**
 * @typedef PasswordChange
 * @property {string} old_password
 * @property {string} password
 */

const userSchema = CreateSchema({
  userId: {
    type: String,
    require: [true, stringMessage.id_required],
    minLength: 3,
    trim: true
  },
  firstName: {
    type: String,
    required: [true, stringMessage.name_required],
    minLength: 3,
    trim: true
  },
  email: {
    type: String,
    required: [true, stringMessage.email_required],
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error(stringMessage.invalid_email)
      }
    }
  },
  password: {
    type: String,
    required: [true, stringMessage.password_required],
    minLength: 5
  },
  role: {
    type: String,
    enum: {
      values: enumModel.ENUM_ROLE,
      message: "Quyền không đúng!"
    },
    default: enumModel.ENUM_ROLE[1],    // ['admin', 'student', 'teacher']
    require: [true, stringMessage.role_wrong]
  },
  qrUrl: {
    type: String,
  },
  avtUrl: {
    type: String,
  },
  token: {
    type: String,
  },
  majorId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Major',
    require: true
  },
  birthDate: {
    type: Date,
    require: true,
  },
  birthplace: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  sex: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  idNo: {
    type: String,
    unique: true,
    trim: true,
    require: true
  }
}, modelName)

userSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  if (!user.avtUrl || (user.avtUrl && user.avtUrl.length == 0)) {
    user.avtUrl = userUtil.generateAvatar(`${user.lastName} ${user.firstName}`)
  }
  next()
})


userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this
  const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_KEY)
  user.token = token
  await user.save()
  return token
}

//=====
userSchema.statics.findByCredentials = async (id, password) => {
  // Search for a user by id and password.
  const user = await User.findOne({ userId: id, status: { $ne: STATUS.DELETED } }).populate({
    path: 'majorId',
    populate: {
      path: 'departmentId',
      model: 'Department'
    }
  });
  if (!user) {
    return null;
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    return null;
  }

  return user
}

userSchema.methods.isUnique = async (id, email) => {
  const userId = await User.findOne({ userId: id })
  if (userId) {
    return false;
  }
  return true;

}
//===
const User = mongoose.model(modelName, userSchema)

module.exports = User