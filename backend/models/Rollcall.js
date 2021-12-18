const mongoose = require('mongoose');
const { ROLLCALL_STATUS } = require('../value/model');
const baseSchema = require('./BaseSchema')

const modelName = 'Rollcall'

const rollcallSchema = baseSchema.CreateSchema({
  rollcallReportId: {
    type: String,
    require: true,
    trim: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    require: true
  },
  rollcallStatus: {
    type: String,
    enum: {
      values: ROLLCALL_STATUS.ENUM,
      message: "Trạng thái không đúng!"
    },
    default: ROLLCALL_STATUS.ABSENT,
    require: true
  }
}, modelName)

const Rollcall = mongoose.model(modelName, rollcallSchema);

module.exports = Rollcall;