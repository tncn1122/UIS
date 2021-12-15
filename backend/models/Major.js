const mongoose = require('mongoose');
const baseSchema = require('./BaseSchema')

const modelName = 'Major'


const majorSchema = baseSchema.CreateSchema({
  majorId: {
    type: String,
    require: true,
    trim: true
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Department',
    require: true
  },
  name: {
    type: String,
    trim: true,
    require: true
  }
}, modelName)

const Major = mongoose.model(modelName, majorSchema);

module.exports = Major;