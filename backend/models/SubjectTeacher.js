const mongoose = require('mongoose');
const baseSchema = require('./BaseSchema')

const modelName = 'subjectTeacher'

const subjectTeacherSchema = baseSchema.CreateSchema({
  teacherId: {
    type: String,
    require: true,
    trim: true
  },
  subjectId: [
    {
      type: String,
      require: true,
      trim: true
    }
  ]
}, modelName)

const subjectTeacher = mongoose.model(modelName, subjectTeacherSchema);

module.exports = subjectTeacher;