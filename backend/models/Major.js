const mongoose = require('mongoose');
const baseSchema = require('./BaseSchema')

const modelName = 'Major'


const majorSchema = baseSchema.CreateSchema({
  majorId: {
    type: String,
    unique: true,
    require: true,
    trim: true
  },
  departmentId: {
    type: String,
    require: true,
    trim: true
  },
  name: {
    type: String,
    trim: true,
    require: true
  }
}, modelName)

const major = mongoose.model(modelName, majorSchema);

module.exports = major;