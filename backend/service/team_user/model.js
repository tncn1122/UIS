import { Op } from 'sequelize'
const TeamUser = require('../../config/dbMaster')['TeamUser']

module.exports = {
  async add(data) {
    return TeamUser.create(data, { fields: ['status', 'userId', 'teamId', 'title'] })
  },

  delete(userId, teamId) {
    return TeamUser.destroy({
      where: {
        [Op.and]: [
          {userId: userId},
          {teamId: teamId}
        ]
      }
    })
  }
}
