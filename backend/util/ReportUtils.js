const stringMessage = require('../value/string')
const moment = require('moment-timezone');
const { TIME_ZONE, DATE_FORMAT, HOUR_FORMAT } = require('../value/time');
const RollCallReport = require('../models/RollCallReport');
const Rollcall = require('../models/Rollcall');
const { formatDate } = require('./TimeUtils');





function genRandomString(seed, length) {
  let res = "";
  for (let i = 0; i < length; i++) {
    res += seed.charAt(Math.floor(Math.random() * seed.length));
  }
  return res;
}


function genReportId(class_id, scheduleId) {
  return [class_id, scheduleId, genRandomString('0123456789', 6)].join('$');
}

function isAbleCreatedReport(dateList) {
  if (dateList.length > 0) {
    moment.tz.setDefault(TIME_ZONE);
    const shift = dateList[0].split('@')[0];
    const now = moment();
    const nowMM = shift + '@' + formatDate(moment(now, DATE_FORMAT));
    // console.log(nowMM);
    // console.log(dateList);
    return dateList.indexOf(nowMM);
  }
  else {
    return -1;
  }

}

function isAbleToCheckin(day) {
  moment.tz.setDefault(TIME_ZONE);
  const dateMM = moment(DATE_FORMAT);
  return moment().isSame(dateMM, day);
}
function getStatusCheckin(reportInfo) {
  moment.tz.setDefault("Asia/Ho_Chi_Minh");
  const now = moment();
  const limitTime = moment(reportInfo.checkinLimitTime, HOUR_FORMAT);
  const expiredTime = moment(reportInfo.expired, HOUR_FORMAT);

  if (!reportInfo.allowLate) {
    expiredtime = limitTime;
  }
  if (now.isBefore(limitTime)) {
    return "ontime";
  }
  else if (now.isBefore(expiredTime)) {
    return "late";
  }
  else {
    return "absent";
  }

}


async function findReport(stringDate, subjectObj) {
  return await RollCallReport.findOne({ date: stringDate, subjectId: subjectObj }).populate({
    path: 'subjectId',
    populate: {
      path: 'roomId',
      model: 'Room'
    }
  }).populate({
    path: 'content',
    populate: {
      path: 'studentId',
      model: 'User',
      populate: {
        path: 'majorId',
        model: 'Major',
      }
    }
  });
}

async function generateReportContent(reportId, listStudents) {
  const results = await Promise.all(listStudents.map(async item => {
    const rollcall = new Rollcall({
      rollcallReportId: reportId,
      studentId: item
    })
    await rollcall.save()
    return rollcall
  }))
  return results
}

module.exports = {
  isAbleCreatedReport,
  genReportId,
  getStatusCheckin,
  isAbleToCheckin,
  findReport,
  generateReportContent
}