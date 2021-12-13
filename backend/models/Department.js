const mongoose = require('mongoose');
const baseSchema = require('./BaseSchema')

const modelName = 'Department'

const departmentSchema = baseSchema.CreateSchema({
  departmentId: {
    type: String,
    unique: true,
    require: true,
    trim: true
  },
  name: {
    type: String,
    trim: true,
    require: true
  }
}, modelName)

const department = mongoose.model(modelName, departmentSchema);

module.exports = department;