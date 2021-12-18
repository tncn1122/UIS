const mongoose = require('mongoose');
const classtUtil = require('../util/ClassUtils');
const validateUtil = require('../util/Validate');
const QR = require('../util/QR');
const baseSchema = require('./BaseSchema');
const { getDate } = require('../util/TimeUtils');

const modelName = 'RollcallReport'


/**
 * @typedef UserReport
 * @property {User.model} user.required
 * @property {enum} status.required - absent là chưa điểm danh (vắng), ontime là điểm danh hợp lệ, late là điểm danh muộn. - eg: integer:absent,ontime,late
 */
/**
 * @typedef RollCallReport
 * @property {string} id.required
 * @property {string} subjectName.required
 * @property {string} teacherName.required
 * @property {string} subject.required
 * @property {Array.<UserReport>} content.required
 * @property {string} qrUrl.required
 * @property {string} date.required
 * @property {string} expired.required
 * @property {string} checkinLimitTime.required
 * @property {boolean} allowLate.required
 */

const reportschema = baseSchema.CreateSchema({
  rollcallReportId: {
    type: String,
    require: true,
    trim: true
  },
  content: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'Rollcall',
      require: true
    },
  ],
  qrUrl: {
    type: String,
    require: true
  },
  date: {
    type: String
  },
  expired: {
    type: String,
    require: true
  },
  checkinLimitTime: {
    type: String,
    require: true
  },
  allowLate: {
    type: Boolean,
    required: true
  },
  
  subjectId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Subject',
    require: true,
  }
}, modelName)

reportschema.pre('save', async function (next) {
  const report = this;
  report.qrUrl = QR.createQR(report.id);
  report.date = getDate()

  classtUtil.validateDate(report.checkinLimitTime);
  validateUtil.id(report.id);
  report.checkinLimitTime = validateUtil.limitTime(report.expired, report.checkinLimitTime);
  next();
})

const RollCallReport = mongoose.model(modelName, reportschema);

module.exports = RollCallReport;