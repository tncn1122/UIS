import ContestModel from './model'
import {LoggerUtils, ValidationUtils, DateTimeUtils} from "../../utils"
import {
  AUDIT_LOG_ACTION,
  AUDIT_LOG_FORMAT,
  AUDIT_LOG_MODEL,
  AUDIT_LOG_STATUS,
  CONTEST_STATUS,
  TEXT_NOTIFICATION_FAILED,
  TEXT_VALIDATOR
} from "../../config"

const currentFileName = require('path').basename(__filename)

module.exports = {
  // admin
  async create(currentUser, data) {
    data.createdBy = currentUser.id
    data.event_time_begin = data.event_time[0]
    data.event_time_end = data.event_time[1]
    const contest = await ContestModel.create(data)
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, `${AUDIT_LOG_ACTION.CREATE} ${AUDIT_LOG_MODEL.CONTEST}`, AUDIT_LOG_STATUS.SUCCESS, {name: contest.name})
  },

  async update(data) {
    data.event_time_begin = data.event_time[0]
    data.event_time_end = data.event_time[1]
    const contest = await ContestModel.update(data)
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, `${AUDIT_LOG_ACTION.UPDATE} ${AUDIT_LOG_MODEL.CONTEST}`, AUDIT_LOG_STATUS.SUCCESS, {name: contest.name})
  },

  async delete(currentUser, data) {
    data.deletedBy = currentUser.id
    data.is_deleted = true
    data.deletedAt = DateTimeUtils.now()
    const contest = await ContestModel.delete(data)
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, `${AUDIT_LOG_ACTION.DELETE} ${AUDIT_LOG_MODEL.CONTEST}`, AUDIT_LOG_STATUS.SUCCESS, {name: contest.name})
  },

  // power & admin
  async list() {
    return await ContestModel.list()
  },

  // user
  async getById(contestId) {
    if (ValidationUtils.empty(contestId))
      throw new Error(TEXT_VALIDATOR.INVALID_PAYLOAD)
    const contest = await ContestModel.getByIdWithoutURL(contestId)
    if (ValidationUtils.empty(contest))
      throw new Error(TEXT_VALIDATOR.CANNOT_FIND_CONTEST)
    return contest
  },

  // user
  async getPublic(currentUser) {
    return await ContestModel.getPublic(currentUser)
  },

  // user login required
  async register(currentUser, contestId) {
    if (ValidationUtils.empty(contestId))
      throw new Error(TEXT_VALIDATOR.INVALID_PAYLOAD)
    const contest = await ContestModel.getById(contestId)
    if (ValidationUtils.empty(contest))
      throw new Error(TEXT_VALIDATOR.CANNOT_FIND_CONTEST)
    if (!contest.is_open_registration)
      throw new Error(TEXT_VALIDATOR.ERROR_FORBIDDEN)
    const {isRegister, isError} = await ContestModel.register(currentUser, contest)
    if (!isError)
      LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, `${isRegister? AUDIT_LOG_ACTION.REGISTER : AUDIT_LOG_ACTION.UNREGISTER} ${AUDIT_LOG_MODEL.CONTEST}`, AUDIT_LOG_STATUS.SUCCESS, {user: currentUser.email, contest: contest.name})
    else
      throw new Error(TEXT_NOTIFICATION_FAILED.CANNOT_REGISTER_CONTEST)
  },

  // user login required
  async visitRoom(currentUser, contestId) {
    if (ValidationUtils.empty(contestId))
      throw new Error(TEXT_VALIDATOR.INVALID_PAYLOAD)
    const contest = await ContestModel.getById(contestId)
    if (ValidationUtils.empty(contest))
      throw new Error(TEXT_VALIDATOR.CANNOT_FIND_CONTEST)
    else if (contest.status !== CONTEST_STATUS.ONGOING)
      throw new Error(TEXT_VALIDATOR.CANNOT_FIND_ONGOING_CONTEST_ROOM)
    return ContestModel.logUserIntoRoom(currentUser, contest)
  }
}
