const mongoose = require('mongoose');
const baseSchema = require('./BaseSchema')

const modelName = 'subjectStudent'


const subjectStudentSchema = baseSchema.CreateSchema({
  userId: {
    type: String,
    require: true,
    trim: true
  },
  subjectId:
  {
    type: String,
    require: true,
    trim: true
  },
  diligenceMark: Number,
  serminarMark: Number,
  examMark1: Number,
  examMark2: Number,
  examMark3: Number,
}, modelName)

const subjectStudent = mongoose.model(modelName, subjectStudentSchema);

module.exports = subjectStudent; 