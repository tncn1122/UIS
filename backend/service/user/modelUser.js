import { Op } from 'sequelize'
import { CryptoUtils, ValidationUtils } from '../../utils'
import { DEFAULT_AVT, USER_ROLE } from '../../config'
const User = require('../../config/dbMaster')['User']
const TeamUser = require('../../config/dbMaster')['TeamUser']
const Team = require('../../config/dbMaster')['Team']

// filtering before executing to DB
module.exports = {

  serialize(user) {
    let userObject = user.toJSON()
    userObject.avatar = userObject.userProfile.avatar ? userObject.userProfile.avatar : DEFAULT_AVT;
    delete userObject.password
    return userObject
  },

  create(data) {
    return User.create(data, { fields: ['username', 'email', 'password'] })
  },

  getAll() {
    return User.findAll({attributes: ['id', 'username', 'email', 'status', 'role']})
  },

  getById(id) {
    return User.findByPk(id, {
      attributes: { exclude: ['password'] }
    })
  },

  getByEmail(email) {
    return User.findOne({
      where: {email}
    }, {
      attributes: { exclude: ['password'] }
    })
  },

  getByUserId(id) {
    return User.findOne({
      attributes: {exclude: ['password']},
      where: { id },
      include: [
        'userProfile',
        'userEducations',
        'userWorkExperiences'
      ]
    })
  },

  // BE CAREFUL: return data has password !!!
  getWithPasswordByUsernameOrEmail(username_email, minRole) {
    const role = ValidationUtils.empty(minRole) ? USER_ROLE.USER : minRole.toLowerCase()
    return User.findOne({
      // attributes: {exclude: ['password']}, : we need password for next verifyPassword action
      where: {
        [Op.or]: [
          { username: username_email },
          { email: username_email }
        ],
        role: {
          [Op.like]: `%${role}%`
        }
      },
      include: [
        'userProfile',
        'userEducations',
        'userWorkExperiences'
      ]
    })
  },

  updateById(userId, attributes) {
    return User.update(attributes, { where: { id: userId } })
  },

  verifyPassword(user, password) {
    return CryptoUtils.verifySecret(password, user.password)
  },

  async getTeams(userId) {
    const teams = await TeamUser.findAll({
      where: {
        userId: userId
      },
      attributes: ['teamId'],
      raw: true
    })

    const teamsWithMembers = []
    for (let team of teams) {
      teamsWithMembers.push(await Team.findOne(
        {
          where: {
            id: team.teamId
          },
          include: [{
            model: User,
            as: 'members',
            attributes: [
              'id',
              ['username', 'name'],
              'email'
            ]
          }],
          attributes: [
            ['id', 'teamID'],
            'name',
            'description',
          ]
        }
      ))
    }
    return teamsWithMembers.filter(team => team !== null)
  }
}
