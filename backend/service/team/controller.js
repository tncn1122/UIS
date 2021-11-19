import TeamModel from './model'
import TeamUserModel from '../team_user/model'
import {LoggerUtils, ValidationUtils} from "../../utils"
import {
  AUDIT_LOG_ACTION,
  AUDIT_LOG_FORMAT,
  AUDIT_LOG_MODEL,
  AUDIT_LOG_STATUS,
  TEXT_VALIDATOR
} from "../../config"
import UserModel from "../user/modelUser"

const currentFileName = require('path').basename(__filename)

module.exports = {
  async create(data) {
    // check existence
    const nameExisted = await TeamModel.getByName(data.name)
    if(nameExisted) {
      throw new Error(TEXT_VALIDATOR.TEAM_NAME_EXISTED)
    }
    const team = await TeamModel.create(data)
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, `${AUDIT_LOG_ACTION.CREATE} ${AUDIT_LOG_MODEL.TEAM}`, AUDIT_LOG_STATUS.SUCCESS, {name: team.name})
    // add the member who create this team as LEADER
    await TeamUserModel.add({
      status: 'ACCEPTED',
      userId: team.createdBy,
      teamId: team.id,
      title: 'LEADER'
    })
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, `${AUDIT_LOG_ACTION.ADD} ${AUDIT_LOG_MODEL.TEAM_MEMBER}`, AUDIT_LOG_STATUS.SUCCESS, {team: team.name, memberId: team.createdBy, role: 'LEADER'})
  },

  async getAll() {
    let teams = await TeamModel.getAll()
    let formattedTeams = JSON.parse(JSON.stringify(teams))
    for (let team of formattedTeams) {
      for (let member of team.members) {
        member.status = member.TeamUser.status.toLowerCase()
        member.title = member.TeamUser.title
        member.addedAt = member.TeamUser.createdAt
        delete member.TeamUser
      }
      team.createdBy = team.createdByUser.email
      delete team.createdByUser
    }
    return formattedTeams.sort((t1, t2) => (t1.id - t2.id))
  },

  async rename(currentUser, teamId, data) {
    const { newName } = data
    if (ValidationUtils.empty(newName))
      throw new Error(TEXT_VALIDATOR.INVALID_PAYLOAD)
    // check existence
    const nameExisted = await TeamModel.getByName(newName)
    if (nameExisted)
      throw new Error(TEXT_VALIDATOR.TEAM_NAME_EXISTED)
    // check ownership
    const team = await TeamModel.getById(teamId)
    if (team.createdBy !== currentUser.id)
      throw new Error(TEXT_VALIDATOR.ERROR_FORBIDDEN)
    const oldName = team.name
    team.name = newName
    team.save()
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, `${AUDIT_LOG_ACTION.RENAME} ${AUDIT_LOG_MODEL.TEAM}`, AUDIT_LOG_STATUS.SUCCESS, {oldName, newName})
  },

  async delete(currentUser, teamId) {
    const team = await TeamModel.getById(teamId)
    if (!team) {
      throw new Error(TEXT_VALIDATOR.CANNOT_FIND_TEAM)
    }
    // check ownership
    if (team.createdBy !== currentUser.id) {
      throw new Error(TEXT_VALIDATOR.ERROR_FORBIDDEN)
    }
    await TeamModel.delete(teamId)
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, `${AUDIT_LOG_ACTION.DELETE} ${AUDIT_LOG_MODEL.TEAM}`, AUDIT_LOG_STATUS.SUCCESS, {teamId})
  },

  async addMember(req) {
    const {email} = req.body
    const currentUser = req.currentUser
    const user = await UserModel.getByEmail(email)
    if (!user)
      throw new Error(TEXT_VALIDATOR.CANNOT_FIND_USER)
    const team = await TeamModel.getById(req.params.id)
    if(!team) {
      throw new Error(TEXT_VALIDATOR.CANNOT_FIND_TEAM)
    }
    // check ownership
    if (team.createdBy !== currentUser.id) {
      throw new Error(TEXT_VALIDATOR.ERROR_FORBIDDEN)
    }
    await TeamUserModel.add({
      userId: user.id,
      teamId: team.id,
      title: 'MEMBER',
      status: 'PENDING'
    })
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, `${AUDIT_LOG_ACTION.ADD} ${AUDIT_LOG_MODEL.TEAM_MEMBER}`, AUDIT_LOG_STATUS.SUCCESS, {team: team.name, memberId: user.id, memberEmail: user.email, role: 'MEMBER'})
  },

  async deleteMember(currentUser, memberId, teamId){
    const user = await UserModel.getById(memberId)
    if(!user) {
      throw new Error(TEXT_VALIDATOR.CANNOT_FIND_USER)
    }
    const team = await TeamModel.getById(teamId)
    if(!team) {
      throw new Error(TEXT_VALIDATOR.CANNOT_FIND_TEAM)
    }
    // check ownership
    if (team.createdBy !== currentUser.id) {
      throw new Error(TEXT_VALIDATOR.ERROR_FORBIDDEN)
    }
    await TeamUserModel.delete(memberId, teamId)
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, `${AUDIT_LOG_ACTION.DELETE} ${AUDIT_LOG_MODEL.TEAM_MEMBER}`, AUDIT_LOG_STATUS.SUCCESS, {team: team.name, memberId: user.id, memberEmail: user.email, role: 'MEMBER'})
  }
}
