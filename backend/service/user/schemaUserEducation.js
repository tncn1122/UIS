import {TIME_FORMAT_DATE_ONLY} from "../../config";

const { DataTypes } = require('sequelize');
import { DateTimeUtils } from "../../utils";

module.exports = (dbConnection) => dbConnection.define(
  'UserEducation',
  {
    at_current: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    school: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    major: {
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
    study_time: {
      type: DataTypes.VIRTUAL,
      get() {
        const begin = this.time_begin ? DateTimeUtils.formatDate(this.time_begin, TIME_FORMAT_DATE_ONLY) : '';
        const end = this.time_end ? DateTimeUtils.formatDate(this.time_end, TIME_FORMAT_DATE_ONLY) : '';
        return `${begin} - ${end}`;
      },
    }
  },
  {
    tableName: 'user_education',
  }
)
