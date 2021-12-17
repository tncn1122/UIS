const mongoose = require('mongoose');
const baseSchema = require('./BaseSchema')

const modelName = 'subjectStudent'


const subjectStudentSchema = baseSchema.CreateSchema({
  subjectId:
  {
    type: mongoose.Schema.Types.ObjectId, ref: 'Subject',
    require: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    require: true
  },
  diligenceMark: {
    type: Number,
    require: true,
    default: 0
  },
  serminarMark: {
    type: Number,
    require: true,
    default: 0
  },
  examMark1: {
    type: Number,
    require: true,
    default: 0
  },
  examMark2: {
    type: Number,
    require: true,
    default: 0
  },
  examMark3: {
    type: Number,
    require: true,
    default: 0
  },
}, modelName)

const SubjectStudent = mongoose.model(modelName, subjectStudentSchema);

module.exports = SubjectStudent; 