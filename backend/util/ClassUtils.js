const stringMessage = require('../value/string')
const ClassInfo = require('../models/ClassInfo');
const moment = require('moment-timezone');
const Subject = require('../models/Subject');
const { STATUS } = require('../value/model');
const { startDate_wrong, dayOfWeek_wrong } = require('../value/string');


const week = {
  '2': 'Monday',
  '3': 'Tuesday',
  '4': 'Wednesday',
  '5': 'thursday',
  '6': 'Friday',
  '7': 'Saturday',
}

async function findClass(classId) {
  const classInfo = await Subject.findOne({ subjectId: classId, status: { $ne: STATUS.DELETED } }).populate('roomId');
  return classInfo;
}

function validateDate(date) {
  try {
    return moment(date, 'DD-MM-YYYY', true).isValid();
  }
  catch (err) {
    throw new Error(stringMessage.date_wrong);
  }
}


function validateDays(days) {
  if (days <= 0) {
    throw new Error(stringMessage.days_wrong);
  }
}

function formatDate(date, stringDate = "DD-MM-YYYY") {
  return moment(date).format(stringDate);
}

function currentDate() {
  // return formatDate(moment());
  return moment()
}

function isChangeExpired(startDate) {
  moment.tz.setDefault("Asia/Ho_Chi_Minh");
  const now = moment();
  const startDateMM = moment(startDate, 'DD-MM-YYYY');
  return (now.isSameOrAfter(startDateMM));
}



function genSchedule(startDate, shift, days, dayOfWeek) {
  let schedule = [];
  console.log(startDate, shift, days, dayOfWeek);
  if(!startDate || !dayOfWeek){
    return []
  }
  let day = moment(startDate, 'DD-MM-YYYY');
  let flag = 0
  if(!week.hasOwnProperty(dayOfWeek)){
    throw new Error(dayOfWeek_wrong)
  }
  while (day.format('dddd') !== week[dayOfWeek]) {
    flag = flag+1
    if(flag > 10){
      throw new Error(startDate_wrong)
    }
    day.add(1, 'days');
  }
  for (let times = 0; times < days; times++) {
    schedule.push(shift + '@' + formatDate(day));
    day.add(7, 'days');
  }
  return schedule;
}

function createBaseClassInfo(classInfo) {
  return {
    subjectId: classInfo.subjectId || "",
    name: classInfo.name || "",
    credit: classInfo.credit || 0,
    dayOfWeek: classInfo.dayOfWeek || "2",
    shift: classInfo.shift || '0',
    days: classInfo.days || 0,
    startDate: classInfo.startDate || currentDate(),
    credits: classInfo.credit || 0,
    semester: classInfo.semester || 0,
    percentDiligence: classInfo.percentDiligence || 0,
    percentTest: classInfo.percentTest || 0,
    percentPractice: classInfo.percentPractice || 0,
    percentSerminar: classInfo.percentSerminar || 0,
    percentExam: classInfo.percentExam || 0,
  };
}

async function createListClass(classIdList) {
  let class_list = [];

  if (classIdList) {
    for (const class_id of classIdList) {
      let classInfo = await ClassInfo.findOne({ id: class_id.id });
      if (!classInfo) {
        throw new Error(stringMessage.class_not_found + " Lớp: " + class_id);
      }
      class_list.push(classInfo);
    }
  }
  return class_list;
}


module.exports = {
  currentDate,
  formatDate,
  createBaseClassInfo,
  createListClass,
  findClass,
  genSchedule,
  isChangeExpired,
  validateDate,
  validateDays
}