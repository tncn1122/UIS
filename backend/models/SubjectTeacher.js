const mongoose = require('mongoose');
const baseSchema = require('./BaseSchema')

const modelName = 'SubjectTeacher'

const subjectTeacherSchema = baseSchema.CreateSchema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    require: true
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Subject',
    require: true
  }
}, modelName)

const SubjectTeacher = mongoose.model(modelName, subjectTeacherSchema);

module.exports = SubjectTeacher;