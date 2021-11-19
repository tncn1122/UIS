const { DataTypes } = require('sequelize');
import { DateTimeUtils } from '../../utils'
import { CONTEST_STATUS } from '../../config'

module.exports = (dbConnection) => dbConnection.define(
    'Contest',
    {
        name: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        is_public: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        is_visible: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_open_registration: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        url: {
            type: DataTypes.STRING(2048),
            defaultValue: '',
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        event_time_begin: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        event_time_end: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        information: {
            type: DataTypes.TEXT,
            defaultValue: '',
        },
        waiting_room: {
            type: DataTypes.TEXT,
            defaultValue: '',
        },
        is_deleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        status: {
          type: DataTypes.VIRTUAL,
          get() {
            const { event_time_begin, event_time_end } = this
            const begin = DateTimeUtils.textToDate(event_time_begin)
            const end = DateTimeUtils.textToDate(event_time_end)
            const now = DateTimeUtils.now()
            if (end < now)
              return CONTEST_STATUS.PAST
            else if (begin < now)
              return CONTEST_STATUS.ONGOING
            else
              return CONTEST_STATUS.PLANNED
          },
        }
    },
    {
        tableName: 'contest',
    }
)
