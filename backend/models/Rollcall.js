const mongoose = require('mongoose');
const baseSchema = require('./BaseSchema')

const modelName = 'Rollcall'

const rollcallSchema = baseSchema.CreateSchema({
  rollcallReportId: {
    type: String,
    require: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    require: true
  },
  rollcallStatus: {
    type: String,
    enum: {
      values: ['late', 'ontime', 'absent'],
      message: "Trạng thái không đúng!"
    },
    require: true
  }
}, modelName)

const rollcall = mongoose.model(modelName, rollcallSchema);

module.exports = rollcall;