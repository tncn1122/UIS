import { TEXT_VALIDATOR } from '../../config'
import { Op } from 'sequelize'
const Team = require('../../config/dbMaster')['Team']
const User = require('../../config/dbMaster')['User']

module.exports = {
  getAll() {
    return Team.findAll({
      include: [
        {
          model: User,
          as: 'members',
          attributes: ['email']
        },
        {
          model: User,
          as: 'createdByUser',
          attributes: ['email']
        }
      ],
      attributes: ['id', 'name', 'description', 'createdAt']
    })
  },

  getById(id) {
    return Team.findByPk(id)
  },

  getByName(name) {
    return Team.findOne({
      where: {name}
    })
  },

  async create(data) {
    return Team.create(data, { fields: ['name', 'description', 'createdBy'] })
  },

  delete(teamId) {
    return Team.destroy({
      where: {
        id: teamId
      }
    })
  }
}
