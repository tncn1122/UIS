import ContestCalendar from './model'
import {LoggerUtils, ValidationUtils} from "../../utils"
import {AUDIT_LOG_ACTION, AUDIT_LOG_FORMAT, AUDIT_LOG_MODEL, AUDIT_LOG_STATUS, TEXT_VALIDATOR} from "../../config"

const currentFileName = require('path').basename(__filename)

module.exports = {
  async addToCalendar(currentUser, data) {
    const { contestId } = data
    if (ValidationUtils.empty(contestId))
      throw new Error(TEXT_VALIDATOR.INVALID_PAYLOAD)
    const userId = currentUser.id
    const auditData = {email: currentUser.email, contestId}
    const existentCalendar = await ContestCalendar.getByUserAndContest(userId, contestId)
    if (ValidationUtils.empty(existentCalendar)) {
      // todo: add to user google calendar, if success then
      ContestCalendar.create({userId, contestId})
      LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, `${AUDIT_LOG_ACTION.CREATE} ${AUDIT_LOG_MODEL.CALENDAR}`, AUDIT_LOG_STATUS.SUCCESS, auditData)
    } else {
      // todo: remove user google calendar, if success then
      ContestCalendar.deleteByUserAndContest(userId, contestId)
      LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, `${AUDIT_LOG_ACTION.DELETE} ${AUDIT_LOG_MODEL.CALENDAR}`, AUDIT_LOG_STATUS.SUCCESS, auditData)
    }
  }
}
