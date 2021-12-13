const mongoose = require('mongoose');
const baseSchema = require('./BaseSchema')

const modelName = 'Subject'

const subjectSchema = baseSchema.CreateSchema({
  subjectId: {
    type: String,
    require: true,
    trim: true
  },
  semester:
  {
    type: String,
    require: true,
    trim: true
  },
  roomId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  credits: {
    type: Number,
    require: true,
  },
  shift: {
    type: Number,
    require: true,
  },
  startDate: {
    type: Date,
    require: true,
  },
  schedule: {
    type: String,
    require: true,
  },
  days: {
    type: Number,
    require: true,
  },
  dayOfWeek: {
    type: String,
    require: true,
  },

  percentDiligence: {
    type: Number,
    require: true,
  },
  percentTest: {
    type: Number,
    require: true,
  },
  percentPractice: {
    type: Number,
    require: true,
  },
  percentSerminar: {
    type: Number,
    require: true,
  },
  percentExam: {
    type: Number,
    require: true,
  },
}, modelName)

const subject = mongoose.model(modelName, subjectSchema);

module.exports = subject;