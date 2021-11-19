const { DataTypes } = require('sequelize')
import { DATABASE_FOREIGN_KEY } from '../../../config'

module.exports = (dbConnection) => dbConnection.define(
    'NewsLike',
    {
    },
    {
        tableName: 'news_like',
        uniqueKeys: {
            newsLikeUnique: {
                fields: [DATABASE_FOREIGN_KEY.NEWS_ID, DATABASE_FOREIGN_KEY.USER_ID]
            }
        }
    }
)