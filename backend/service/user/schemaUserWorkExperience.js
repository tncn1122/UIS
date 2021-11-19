import {TIME_FORMAT_DATE_ONLY} from "../../config";
import { DateTimeUtils } from "../../utils"

const { DataTypes } = require('sequelize')

module.exports = (dbConnection) => dbConnection.define(
  'UserWorkExperience',
  {
    at_current: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    company: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    time_begin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    time_end: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    work_time: {
      type: DataTypes.VIRTUAL,
      get() {
        const begin = this.time_begin ? DateTimeUtils.formatDate(this.time_begin, TIME_FORMAT_DATE_ONLY) : '';
        const end = this.time_end ? DateTimeUtils.formatDate(this.time_end, TIME_FORMAT_DATE_ONLY) : '';
        return `${begin} - ${end}`;
      },
    }
  },
  {
    tableName: 'user_work_experience',
  }
)
