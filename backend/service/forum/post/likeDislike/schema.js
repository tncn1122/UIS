const { DataTypes, TEXT } = require('sequelize')
import { DATABASE_FOREIGN_KEY } from '../../../../config'

module.exports = (dbConnection) => dbConnection.define(
    'ForumPostLikeDislike',
    {
        isLike: {
            type: DataTypes.BOOLEAN,
            notEmpty: true,
            allowNull: false,
        }
    },
    {
        tableName: 'forum_post_like_dislike',
        uniqueKeys: {
            newsCommentLikeUnique: {
                fields: [DATABASE_FOREIGN_KEY.FORUM_POST_ID, DATABASE_FOREIGN_KEY.USER_ID]
            }
        }
    }
)