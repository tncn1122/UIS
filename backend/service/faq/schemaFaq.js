const { DataTypes } = require('sequelize');
import { LOCALE, TEXT_VALIDATOR } from '../../config'

module.exports = (dbConnection) => dbConnection.define(
  'Faq',
  {
    question: {
      type: DataTypes.STRING,
      defaultValue: false,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT('long'),
      defaultValue: false,
      allowNull: false
    },
    locale: {
      type: DataTypes.STRING,
      defaultValue: LOCALE.VIETNAMESE,
      validate: {
        isValid(value) {
          const localesList = Object.values(LOCALE)
          if(!localesList.includes(value)){
            throw new Error(TEXT_VALIDATOR.LOCALE_NOT_FOUND)
          }
        }
      }
    }
  },
  {
    tableName: 'faq',
  }
)
