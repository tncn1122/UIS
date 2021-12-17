const mongoose = require('mongoose');
const baseSchema = require('./BaseSchema')
const classUtil = require('../util/ClassUtils');

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
    type: mongoose.Schema.Types.ObjectId, ref: 'Room',
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
  isFinished: {
    type: Boolean,
    require: true,
    default: false
  }
}, modelName)

const Subject = mongoose.model(modelName, subjectSchema);

subjectSchema.pre('save', function (next) {
  const classInfo = this;
  classUtil.validateDays(classInfo.days);
  classUtil.validateDate(classInfo.dateStart);
  classInfo.schedule = classUtil.genSchedule(classInfo.dateStart, +
    classInfo.shift, classInfo.days, classInfo.dayOfWeek);

  next()
})


module.exports = Subject;