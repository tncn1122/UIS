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
  days: {
    type: Number,
    required: true,
  },
  schedule: [{
    type: String
  }],
  dayOfWeek: {
    type: String,
    required: true,
    enum: {
      values: ['2', '3', '4', '5', '6', '7'],
      message: "Ngày không đúng!"
    },
    default: 0,
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