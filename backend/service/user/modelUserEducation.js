const UserEducation = require('../../config/dbMaster')['UserEducation']
import { DATABASE_FOREIGN_KEY } from '../../config'

const UserEducationField = [DATABASE_FOREIGN_KEY.USER_ID, 'at_current', 'school', 'major', 'time_begin', 'time_end'];
// filtering before executing to DB
module.exports = {

  create(data) {
    return UserEducation.create(data, {
      fields: UserEducationField
    })
  },

  getLatestByUserId(userId) {
    return UserEducation.findAll({
      where: {
        userId
      },
      // TODO: hiện tại lấy 1 record TẠO mới nhất, nếu trường hợp hiện nhiều work experience thì bỏ 2 dòng dưới
      limit: 1,
      order: [ [ 'createdAt', 'DESC' ]]
    })
  },

  async update(userId, data) {
    return UserEducation.update(data, {
      where: {
        userId
      },
      fields:
        // update all fields except userId
        UserEducationField.filter((value) => value !== 'userId')
    })
  },
}