import _ from 'lodash'
import {LoggerUtils, CryptoUtils, MailUtils, ValidationUtils, DateTimeUtils} from '../../utils'
import {
  AUDIT_LOG_ACTION,
  AUDIT_LOG_MODEL,
  AUDIT_LOG_FORMAT,
  TEXT_VALIDATOR,
  USER_STATUS,
  USER_TITLE,
  DATABASE_FOREIGN_KEY,
  DEFAULT_AVT, AUDIT_LOG_STATUS
} from '../../config'
import { config } from '../../config/loadConfig'
const UserModel = require('./modelUser')
const UserProfileModel = require('./modelUserProfile')
const UserEducationModel = require('./modelUserEducation')
const UserWorkExperienceModel = require('./modelUserWorkExperience')

const currentFileName = require('path').basename(__filename)

module.exports = {

  async register(data) {
    const { password, passwordConfirm } = data
    if (ValidationUtils.empty(password) || ValidationUtils.empty(passwordConfirm))
      throw new Error(TEXT_VALIDATOR.INVALID_PAYLOAD)
    if (password !== passwordConfirm)
      throw new Error(JSON.stringify({
        password: TEXT_VALIDATOR.PASSWORD_UNMATCHED
      }))
    // don't need to validate data in here, schemaUser will do it
    const user = await UserModel.create(data)
    const userData = {}
    userData[DATABASE_FOREIGN_KEY.USER_ID] = user.id
    // should await for all in order to catch the error
    await UserProfileModel.create(userData)
    await UserEducationModel.create(userData)
    await UserWorkExperienceModel.create(userData)
    // send mail to user
    MailUtils.register(user, CryptoUtils.generateJWT({ userId: user.id, action: AUDIT_LOG_ACTION.REGISTER }))
    const returnedData = _.pick(user, ['id', 'username', 'email'])
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.REGISTER, AUDIT_LOG_STATUS.SUCCESS, returnedData)
  },

  async login(res, data, minRole) {
    const { username_email, password } = data
    // not as above register, we just query so that no validation executed -> we need validate payload in here
    // in Frontend we already validate each of them, so in here we just make "all-in-one" validation
    // so that we can prevent the "request-through-api" attack
    if (ValidationUtils.empty(username_email) || ValidationUtils.empty(password))
      throw new Error(TEXT_VALIDATOR.INVALID_PAYLOAD)
    const user = await UserModel.getWithPasswordByUsernameOrEmail(username_email, minRole)
    if (ValidationUtils.empty(user) || (!(await UserModel.verifyPassword(user, password)))){
      LoggerUtils.errorAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.LOGIN, AUDIT_LOG_STATUS.FAILED, {username_email})
      throw new Error(TEXT_VALIDATOR.INVALID_LOGIN_CREDENTIALS)
    }
    if (user.status !== USER_STATUS.ACTIVE){
      LoggerUtils.errorAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.LOGIN, AUDIT_LOG_STATUS.INACTIVE, {username_email})
      throw new Error(TEXT_VALIDATOR.ACCOUNT_IS_INACTIVE)
    }
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.LOGIN, AUDIT_LOG_STATUS.SUCCESS, {username_email})
    const { remember } = data
    const cookieAge = remember ? config.get('cookieAge.max') : config.get('cookieAge.min')
    const jwt = CryptoUtils.generateJWT({ userId: user.id, action: AUDIT_LOG_ACTION.LOGIN }, cookieAge)
    res.cookie(config.get('cookieAccessToken'), jwt, {
      httpOnly: true,
      expires: DateTimeUtils.addToDate(DateTimeUtils.now(), cookieAge),
    })
    return {
      resUpdated: res,
      user: UserModel.serialize(user)
    }
  },

  async forgotPassword(data) {
    const {username_email} = data
    if (ValidationUtils.empty(username_email))
      throw new Error(TEXT_VALIDATOR.INVALID_PAYLOAD)
    const user = await UserModel.getWithPasswordByUsernameOrEmail(username_email)
    if (ValidationUtils.empty(user)){
      LoggerUtils.errorAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.FORGOT_PASSWORD, AUDIT_LOG_STATUS.FAILED, data)
      // don't throw Error because we don't want to let user know if their input is valid or not
      return
    }
    if (user.status !== USER_STATUS.ACTIVE){
      LoggerUtils.errorAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.FORGOT_PASSWORD, AUDIT_LOG_STATUS.INACTIVE, data)
      throw new Error(TEXT_VALIDATOR.ACCOUNT_IS_INACTIVE)
    }
    // send mail to user
    MailUtils.forgotPassword(user, CryptoUtils.generateJWT({ userId: user.id, action: AUDIT_LOG_ACTION.FORGOT_PASSWORD }))
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.FORGOT_PASSWORD, AUDIT_LOG_STATUS.SUCCESS, data)
  },

  async resendRegistrationEmail(data) {
    const {username_email} = data
    if (ValidationUtils.empty(username_email))
      throw new Error(TEXT_VALIDATOR.INVALID_PAYLOAD)
    const user = await UserModel.getWithPasswordByUsernameOrEmail(username_email)
    if (ValidationUtils.empty(user)){
      LoggerUtils.errorAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.RESEND_REGISTRATION_EMAIL, AUDIT_LOG_STATUS.FAILED, data)
      // don't throw Error because we don't want to let user know if their input is valid or not
      return
    }
    if (user.status !== USER_STATUS.INACTIVE){
      LoggerUtils.errorAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.RESEND_REGISTRATION_EMAIL, AUDIT_LOG_STATUS.INVALID_STATUS, data)
      throw new Error(TEXT_VALIDATOR.ACCOUNT_IS_ACTIVE)
    }
    MailUtils.register(user, CryptoUtils.generateJWT({ userId: user.id, action: AUDIT_LOG_ACTION.REGISTER }))
    const returnedData = _.pick(user, ['id', 'username', 'email'])
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.REGISTER, AUDIT_LOG_STATUS.SUCCESS, returnedData)
  },

  async changePassword(currentUser, data) {
    const { oldPassword, newPassword, newPasswordConfirm } = data
    if (ValidationUtils.empty(oldPassword) || ValidationUtils.empty(newPassword) || ValidationUtils.empty(newPasswordConfirm))
      throw new Error(JSON.stringify({
        password: TEXT_VALIDATOR.INVALID_PAYLOAD
      }))
    if (newPassword !== newPasswordConfirm)
      throw new Error(JSON.stringify({
        password: TEXT_VALIDATOR.PASSWORD_UNMATCHED
      }))
    const passwordValidation = ValidationUtils.isWeakPassword(newPassword)
    if (passwordValidation)
      throw new Error(passwordValidation)

    const user = await UserModel.getWithPasswordByUsernameOrEmail(currentUser.email)
    if (ValidationUtils.empty(user) || (!(await UserModel.verifyPassword(user, oldPassword)))){
      LoggerUtils.errorAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.CHANGE_PASSWORD, AUDIT_LOG_STATUS.FAILED, {email: currentUser.email})
      throw new Error(TEXT_VALIDATOR.INVALID_OLD_PASSWORD)
    }
    const hash = await CryptoUtils.cryptSecret(newPassword)
    user.password = hash
    user.save()
    // send mail to user
    MailUtils.changePassword(user)
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.CHANGE_PASSWORD, AUDIT_LOG_STATUS.SUCCESS, {email: currentUser.email})
  },

  // latest user education & work experience
  async getUserWithLatestInformation(userId) {
    const user = await UserModel.getById(userId)
    const userProfile = await UserProfileModel.getByUserId(userId)
    const userWorkExperience = await UserWorkExperienceModel.getLatestByUserId(userId);
    const userEducation = await UserEducationModel.getLatestByUserId(userId);
    return {
      user,
      userProfile,
      userWorkExperience,
      userEducation,
    };
  },


  // TODO: add user profile information
  async getUserProfile(userId) {
    const user = await UserModel.getById(userId)
    const userProfile = await UserProfileModel.getByUserId(userId)
    const userWorkExperience = await UserWorkExperienceModel.getLatestByUserId(userId);
    const userEducation = await UserEducationModel.getLatestByUserId(userId);
    return {
      user,
      userProfile,
      userWorkExperience,
      userEducation,
    };
  },

  async updateUserInformation(userId, data) {
    const { userProfile, userEducation, userWorkExperience } = data;

    if (!ValidationUtils.empty(userProfile)) {
      const updated = UserProfileModel.update(userId, userProfile)
      return { updated }
    }

    if (userEducation) {
      // create new record when user update information
      const updated = UserEducationModel.create({...userEducation, userId})
      LoggerUtils.info(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.UPDATE, AUDIT_LOG_MODEL.USER_EDUCATION, JSON.stringify({ updated }))
      return { updated }
    }

    if (userWorkExperience) {
      // create new record when user update information
      const updated = UserWorkExperienceModel.create({...userWorkExperience, userId});
      LoggerUtils.info(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.UPDATE, AUDIT_LOG_MODEL.USER_WORK_EXPERIENCE, JSON.stringify({ updated }))
      return { updated }
    }
  },

  // get all uploaded avatars of users
  async getUploadedAvatars(userId) {
    const user = await UserProfileModel.getByUserId(userId)
    return user.uploaded_avatars
  },

  // upload new avatar
  async uploadUserAvatar(userId, data) {
    const newFile = data[0]; // only upload 1 image
    const rawValue = await UserProfileModel.getAvatar(userId);

    // JSON after parse = {
    //   currentAvatar: 'xxx' <- name of current avatar file
    //   uploaded: [] <- list of uploaded avatars
    // }
    const userAvatar = JSON.parse(rawValue.avatar);

    // push new uploaded image to uploaded array then update model
    userAvatar.uploaded.push(newFile.filename);
    await UserProfileModel.update(userId, { avatar: JSON.stringify(userAvatar) });
  },

  // set new avatar
  async setAvatar(userId, data) {
    const { filename } = data;
    const rawValue = await UserProfileModel.getAvatar(userId);
    const userAvatar = JSON.parse(rawValue.avatar);

    // set only user uploaded file
    if (userAvatar.uploaded.includes(filename) || filename === DEFAULT_AVT) {
      userAvatar.currentAvatar = filename;
      await UserProfileModel.update(userId, { avatar: JSON.stringify(userAvatar) });
      const user = await UserModel.getByUserId(userId);
      return { user: UserModel.serialize(user) };
    }
    else{
      throw new Error('Not found');
    }
  },

  // delete one of uploaded avatar
  async deleteUploadedAvatar(userId, data) {
    const { filename } = data;
    const rawValue = await UserProfileModel.getAvatar(userId);
    const userAvatar = JSON.parse(rawValue.avatar);

    // delete only uploaded file (exclude default avatar)
    if (filename === userAvatar.currentAvatar){
      throw new Error('Cant delete current avatar');
    }
    if (userAvatar.uploaded.includes(filename)) {
      userAvatar.uploaded = userAvatar.uploaded.filter((item) => item !== filename);
      await UserProfileModel.update(userId, { avatar: JSON.stringify(userAvatar) });
    }
    else{
      throw new Error(`Can't delete`);
    }
  },

  // get teams' information
  async getTeams(userId) {
    const teams = await UserModel.getTeams(userId)
    let formattedTeams = JSON.parse(JSON.stringify(teams))
    for (let team of formattedTeams) {
      for (let member of team.members) {
        member.status = member.TeamUser.status.toLowerCase()
        member.title = member.TeamUser.title
        member.addedAt = member.TeamUser.createdAt
        delete member.TeamUser
      }

      // Leader must be render first
      if (team.members[0].title !== USER_TITLE.LEADER) {
        team.members.sort((m1, m2) => (m2.addedAt > m1.addedAt ? -1 : 1))
      }
    }

    return formattedTeams
  },

  async getAllUsers() {
    const users = await UserModel.getAll()
    return users.sort((u1, u2) => u1.id - u2.id)
  },

  async changeRole(userId, data) {
    return UserModel.updateById(userId, data)
  }
}
