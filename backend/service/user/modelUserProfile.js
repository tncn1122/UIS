import { DATABASE_FOREIGN_KEY } from '../../config'
import sequelize from 'sequelize'

const UserProfile = require('../../config/dbMaster')['UserProfile']
const User = require('../../config/dbMaster')['User']

const UserProfileField = [DATABASE_FOREIGN_KEY.USER_ID, 'avatar', 'full_name', 'birth_date', 'phone', 'country', 'province', 'district', 'ward', 'address', 'socials'];


// filtering before executing to DB
module.exports = {

  async create(data) {
    return UserProfile.create(data, {
      fields:
        UserProfileField
    })
  },

  async update(userId, data) {
    return UserProfile.update(data, {
      where: {
        userId,
      },
      fields:
        // update all fields except userId
        UserProfileField.filter((value) => value !== 'userId')
    })
  },

  async getAvatar(userId){
    return UserProfile.findOne({
      where: {
        userId: userId
      },
      attributes: ['avatar'],
      raw: true
    })
  },

  async getByUserId(userId) {
    const userProfileData = await UserProfile.findOne({
      where: {
        userId
      },
    })

    const userData = await User.findOne({
      where: {
        id: userId
      },
      attributes: ['email', 'username'],
    })

    return {
      ...userProfileData.toJSON(),
      email: userData.email,
      username: userData.username
    }
  },
}
