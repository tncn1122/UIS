const { DataTypes } = require('sequelize')
import { DATABASE_FOREIGN_KEY } from '../../../config'

module.exports = (dbConnection) => dbConnection.define(
    'NewsView',
    {
    },
    {
        tableName: 'news_view',
        uniqueKeys: {
            newsViewUnique: {
                fields: [DATABASE_FOREIGN_KEY.NEWS_ID, DATABASE_FOREIGN_KEY.USER_ID]
            }
        }
    },
    
)