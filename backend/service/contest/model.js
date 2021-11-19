const Sequelize = require('sequelize')
const User = require('../../config/dbMaster')['User']
const UserProfile = require('../../config/dbMaster')['UserProfile']
const Contest = require('../../config/dbMaster')['Contest']
import {
  TEXT_NOTIFICATION_FAILED
} from "../../config"
import { BigOCoderUtils } from '../../utils'
import { config } from '../../config/loadConfig'

const registerUserToContest = (user, contest, bigOContestId) => {
  const successCallback = () => {
    // don't need to await
    contest.addUser(user)
    // todo: send email contest register to user
    return {isRegister: true, isError: false}
  }
  const failedCallback = () => {
    return {isRegister: false, isError: true}
  }
  return !bigOContestId ? successCallback() : BigOCoderUtils.registerUserToContest(user.email, bigOContestId, successCallback, failedCallback)
}

const fields = ['name', 'is_public', 'is_visible', 'is_open_registration', 'url',
  'description', 'event_time_begin', 'event_time_end', 'location', 'information', 'waiting_room',
  'is_deleted', 'createdBy', 'deletedBy'
]

module.exports = {
  getById(id) {
    return Contest.findByPk(id, {
      attributes: ['id', 'name', 'is_open_registration', 'is_public', 'url', 'description', 'event_time_begin',
        'event_time_end', 'location', 'status', 'information', 'waiting_room']
    })
  },

  /// user
  getByIdWithoutURL(id) {
    return Contest.findByPk(id, {
      attributes: ['id', 'name', 'is_open_registration', 'is_public', 'description', 'event_time_begin',
        'event_time_end', 'location', 'status', 'information', 'waiting_room']
    })
  },

  // admin
  create(data) {
    return Contest.create(data,
      {
        fields: fields
      }
    )
  },
  update(data) {
    return Contest.update(data,
      {
        where: {
          id: data.id,
        },
        fields: fields
      }
    )
  },

  delete(data) {
    return Contest.update(data,
      {
        where: {
          id: data.id,
        },
      }
    )
  },


  // power & admin
  list() {
    return Contest.findAll({
      where: {
        is_deleted: false
      },
      // attributes: { include: ['id'] },
      order: [
        ['createdAt', 'DESC']
      ],
      include: [
        {
          model: User,
          attributes: ['username'],
          as: 'creator',
          include: [{
            model: UserProfile,
            attributes: ['avatar'],
            as: 'userProfile'
          }]
        },
      ],
    })
  },

  // user
  getPublic(currentUser, attributes) {
    const noOfRegister = `(SELECT COUNT(*) FROM "contest_user" WHERE "contest_user"."contestId"="Contest".id)`
    const isAddedToCalendar = currentUser ?
      `(SELECT COUNT(*) FROM "contest_calendar" WHERE "contest_calendar"."contestId"="Contest".id and "contest_calendar"."userId"='${currentUser.id}')` :
      `(0)`
    const isRegistered = currentUser ?
      `(SELECT COUNT(*) FROM "contest_user" WHERE "contest_user"."contestId"="Contest".id and "contest_user"."userId"='${currentUser.id}')` :
      `(0)`
    return Contest.findAll({
      where: {
        is_deleted: false,
        is_public: true,
        is_visible: true,
      },
      attributes: [
        ...['id', 'name', 'is_open_registration', 'is_public', 'description', 'event_time_begin', 'event_time_end', 'location', 'status'],
        [Sequelize.literal(isAddedToCalendar), 'isAddedToCalendar'],
        [Sequelize.literal(isRegistered), 'isRegistered'],
        [Sequelize.literal(noOfRegister), 'noOfRegister'],
      ],
      order: [
        ['createdAt', 'ASC']
      ]
    })
  },

  // user login required
  async register(user, contest) {
    const bigOContestId = BigOCoderUtils.getContestId(contest.url)
    // ----- already register, we will unregister -----
    if (await contest.hasUser(user)){
      const successCallback = () => {
        // don't need to await
        contest.removeUser(user)
        // todo: send email contest unregister to user
        return {isRegister: false, isError: false}
      }
      const failedCallback = () => {
        return {isRegister: false, isError: true}
      }
      return !bigOContestId ? successCallback() : BigOCoderUtils.unregisterUserFromContest(user.email, bigOContestId, successCallback, failedCallback)
    }

    // ----- not register, we will register-----
    else {
      return registerUserToContest(user, contest, bigOContestId)
    }
  },

  async logUserIntoRoom(user, contest) {
    const bigOContestId = BigOCoderUtils.getContestId(contest.url)
    if (!(await contest.hasUser(user))){
      const {isRegister, isError} = await registerUserToContest(user, contest, bigOContestId)
      if (isError)
        throw new Error(TEXT_NOTIFICATION_FAILED.CANNOT_REGISTER_CONTEST)
    }

    // todo: should pre-populate the AuthToken before contest happen
    const onLoginSuccess = (userObject) => {
      const { AuthToken } = userObject
      return contest.url.toLowerCase().replace(config.get('bigOURLTokenPattern'), AuthToken)
    }
    const onLoginFailed = () => {
    }
    return BigOCoderUtils.login(user.email, onLoginSuccess, onLoginFailed)

  }
}
