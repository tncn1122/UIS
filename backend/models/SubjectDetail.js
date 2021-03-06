const mongoose = require('mongoose');
const baseSchema = require('./BaseSchema')

const modelName = 'subjectDetail'


const subjectDetailSchema = baseSchema.CreateSchema({
  subjectDetailId: {
    type: String,
    unique: true,
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