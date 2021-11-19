const { DataTypes } = require('sequelize')
import {TEXT_VALIDATOR, USER_STATUS, CONST_VALIDATOR} from '../../config'

module.exports = (dbConnection) => dbConnection.define(
    'News',
    {
        title: {
            type: DataTypes.STRING,
            unique: false,
            notEmpty: false,
            allowNull: true,
        },
        htmlContent: {
            type: DataTypes.TEXT,
            unique: false,
            notEmpty: false,
            allowNull: true,
        },
        summary: {
            type: DataTypes.STRING(1000),
            unique: false,
            notEmpty: false,
            allowNull: true,
        },
        thumbnailURL: {
            type: DataTypes.STRING,
            unique: false,
            notEmpty: true,
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.STRING,
            notEmpty: true,
            allowNull: false,
            field: "createdBy"
        },
        status: {
            type: DataTypes.INTEGER,
            notEmpty: true,
            allowNull: false,
            field: "status",
            defaultValue: 1
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            notEmpty: false,
            allowNull: true,
            field: "isDeleted",
            defaultValue: false
        },
        modifiedBy: {
            type: DataTypes.STRING,
            notEmpty: false,
            allowNull: true,
            field: "modifiedBy"
        }
    },
    {
        tableName: 'news'
    }
    
)