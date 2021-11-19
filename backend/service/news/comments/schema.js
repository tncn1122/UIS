const { DataTypes, TEXT } = require('sequelize')
import { TEXT_VALIDATOR, USER_STATUS, CONST_VALIDATOR } from '../../../config'

module.exports = (dbConnection) => dbConnection.define(
    'NewsComment',
    {
        text: {
            type: DataTypes.TEXT,
            notEmpty: true,
            allowNull: false,
            validate: {
                min: {
                    args: CONST_VALIDATOR.NEWS_COMMENT_MIN_LENGTH,
                    msg: TEXT_VALIDATOR.NEWS_COMMENT_MUST_IN_RANGE
                }
            }
        }
    },
    {
        tableName: 'news_comment'
    }
)