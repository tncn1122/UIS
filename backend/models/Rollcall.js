const mongoose = require('mongoose');
const baseSchema = require('./BaseSchema')

const modelName = 'rollcall'

const rollcallSchema = baseSchema.CreateSchema({
  rollcallReportId: {
    type: String,
    unique: true,
    require: true,
    trim: true
  },
  userId: {
    type: String,
    require: true
  },
  rollcallStatus: {
    type: String,
    require: true
  }
}, modelName)

const rollcall = mongoose.model(modelName, rollcallSchema);

module.exports = rollcall;