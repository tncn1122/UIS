const { DataTypes } = require('sequelize')
import {TEXT_VALIDATOR, USER_STATUS, CONST_VALIDATOR} from '../../../config'

module.exports = (dbConnection) => dbConnection.define(
    'ForumCategory',
    {
        name: {
            type: DataTypes.STRING(1000),
            unique: false,
            notEmpty: true,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            notEmpty: true,
            allowNull: false,
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
        tableName: 'forum_category'
    }
    
)