const UserWorkExperience = require('../../config/dbMaster')['UserWorkExperience']
import { DATABASE_FOREIGN_KEY } from '../../config'

const UserWorkExperienceField = [DATABASE_FOREIGN_KEY.USER_ID, 'at_current', 'title', 'company', 'time_begin', 'time_end'];

// filtering before executing to DB
module.exports = {

  create(data) {
    return UserWorkExperience.create(data, {
      fields: UserWorkExperienceField
    })
  },

  getLatestByUserId(userId) {
    return UserWorkExperience.findAll({
      where: {
        userId
      },
      // TODO: hiện tại lấy 1 record TẠO mới nhất, nếu trường hợp hiện nhiều work experiment thì bỏ 2 dòng dưới
      limit: 1,
      order: [ [ 'createdAt', 'DESC' ]]
    })
  },

  async update(userId, data) {
    return UserWorkExperience.update(data, {
      where: {
        userId
      },
      fields:
        // update all fields except userId
        UserWorkExperienceField.filter((value) => value !== 'userId')
    })
  },

}