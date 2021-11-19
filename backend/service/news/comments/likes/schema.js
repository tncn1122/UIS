const { DataTypes } = require('sequelize')
import { DATABASE_FOREIGN_KEY } from '../../../../config'

module.exports = (dbConnection) => dbConnection.define(
    'NewsCommentLike',
    {
    },
    {
        tableName: 'news_comment_like',
        uniqueKeys: {
            newsCommentLikeUnique: {
                fields: [DATABASE_FOREIGN_KEY.NEWS_COMMENT_ID, DATABASE_FOREIGN_KEY.USER_ID]
            }
        }
    }
)