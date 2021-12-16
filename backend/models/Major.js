const mongoose = require('mongoose');
const { major_exist } = require('../value/string');
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


majorSchema.pre('validate', async function (next) {
  // Check exist
  const major = this
  const checkModel = await Major.findOne({majorId: major.majorId, status: {$ne: STATUS.DELETED}})
  if(checkModel){
    throw new Error(major_exist)
  }
  next()
})

const Major = mongoose.model(modelName, majorSchema);

module.exports = Major;