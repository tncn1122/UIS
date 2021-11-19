const { DataTypes } = require('sequelize')
import {TEXT_VALIDATOR, USER_STATUS, CONST_VALIDATOR} from '../../../config'

module.exports = (dbConnection) => dbConnection.define(
    'ForumTopic',
    {
        title: {
            type: DataTypes.STRING(1000),
            unique: false,
            notEmpty: true,
            allowNull: false,
        },
        summary: {
            type: DataTypes.STRING(1000),
            unique: false,
            notEmpty: false,
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            notEmpty: true,
            allowNull: true,
            field: "status"
        },
        isDeleted: {
            type: DataTypes.INTEGER,
            notEmpty: false,
            allowNull: true,
            field: "isDeleted"
        }
    },
    {
        tableName: 'forum_topic'
    }
    
)