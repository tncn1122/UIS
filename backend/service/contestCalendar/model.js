const ContestCalendar = require('../../config/dbMaster')['ContestCalendar']

module.exports = {
  create(data) {
    return ContestCalendar.create(data,
      { fields: ['userId', 'contestId']}
    )
  },

  getByUserAndContest(userId, contestId) {
    return ContestCalendar.findOne({
      where: {
        userId,
        contestId
      }
    })
  },

  deleteByUserAndContest(userId, contestId) {
    return ContestCalendar.destroy({
      where: {
        userId,
        contestId
      }
    })
  },
}
