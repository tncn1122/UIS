const mongoose = require('mongoose');
const baseSchema = require('./BaseSchema')

const modelName = 'SubjectDetail'


const subjectDetailSchema = baseSchema.CreateSchema({
  subjectDetailId: {
    type: String,
    require: true,
    trim: true
  },
  name: {
    type: String,
    require: true
  },
  credits: {
    type: Number,
    require: true
  },
  percentDiligence: Number,
  percentTest: Number,
  percentPractice: Number,
  percentSerminar: Number,
  percentExam: Number
}, modelName)

const subjectDetail = mongoose.model(modelName, subjectDetailSchema);

module.exports = subjectDetail;