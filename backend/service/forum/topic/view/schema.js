const { DataTypes } = require('sequelize')
import { DATABASE_FOREIGN_KEY } from '../../../../config'

module.exports = (dbConnection) => dbConnection.define(
    'ForumTopicView',
    {
    },
    {
        tableName: 'forum_topic_view',
        uniqueKeys: {
            newsViewUnique: {
                fields: [DATABASE_FOREIGN_KEY.FORUM_TOPIC_ID, DATABASE_FOREIGN_KEY.USER_ID]
            }
        }
    },
    
)