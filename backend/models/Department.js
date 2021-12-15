const mongoose = require('mongoose');
const { departmentId_exist } = require('../value/string');
const baseSchema = require('./BaseSchema')

const modelName = 'Department'

const departmentSchema = baseSchema.CreateSchema({
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

departmentSchema.pre('save', async function (next) {
  // Check exist
  const department = this
  const checkModel = Department.findOne({departmentId: department.departmentId})
  if(checkModel){
    throw new Error(departmentId_exist)
  }
  next()
})

const Department = mongoose.model(modelName, departmentSchema);

module.exports = Department;