const stringMessage = require('../value/string')
const ClassInfo = require('../models/ClassInfo');
const moment = require('moment-timezone');
const Subject = require('../models/Subject');
const { STATUS } = require('../value/model');
const { startDate_wrong, dayOfWeek_wrong } = require('../value/string');
const SubjectStudent = require('../models/SubjectStudent');



const getMarksOfStudent = async (userObj) => {
  const listScores = await SubjectStudent.find({ studentId: userObj, "subjectId.status": { $ne: STATUS.DELETED } }).populate('subjectId')
  const result = listScores.map((item) => {
    const markData = preProcessingMark(item)

    return markData
  })

  return result
}

const preProcessingMark = (subStudentObj) => {
  const {
    subjectId,
    diligenceMark,
    testMark,
    practiceMark,
    serminarMark,
    examMark1,
    examMark2,
    examMark3,
  } = subStudentObj

  const {
    name,
    semester,
    credits,
    percentDiligence,
    percentTest,
    percentPractice,
    percentSerminar,
    percentExam,
  } = subjectId

  const maxExam = Math.max(examMark1, examMark2, examMark3)
  const finalMark10 = (percentDiligence * diligenceMark + percentTest * testMark + percentPractice * practiceMark + percentSerminar * serminarMark + percentExam * maxExam) / 100
  const finalMarkChar = toCharMark(finalMark10)
  const finalMark4 = to4Mark[finalMarkChar]
  return {
    semester,
    subjectId: subjectId.subjectId,
    name,
    credits,
    percentDiligence,
    percentTest,
    percentPractice,
    percentSerminar,
    percentExam,
    diligenceMark,
    testMark,
    practiceMark,
    serminarMark,
    examMark1,
    examMark2,
    examMark3,
    finalMark10,
    finalMarkChar,
    finalMark4
  }


}

const toCharMark = (mark) => {
  if (mark >= 9) return "A+"
  if (mark >= 8.5) return "A"
  if (mark >= 8) return "B+"
  if (mark >= 7) return "B"
  if (mark >= 6.5) return "C+"
  if (mark >= 5.5) return "C"
  if (mark >= 5) return "D+"
  if (mark >= 4) return "D"
  return "F"
}

const to4Mark = {
  'A+': 4,
  'A': 3.7,
  'B+': 3.5,
  'B': 3,
  'C+': 2.5,
  'C': 2,
  'D+': 1.5,
  'D': 1,
  'F': 0,
}

const week = {
  '2': 'Monday',
  '3': 'Tuesday',
  '4': 'Wednesday',
  '5': 'thursday',
  '6': 'Friday',
  '7': 'Saturday',
}

async function findClass(classId, semester) {
  const classInfo = await Subject.findOne({ subjectId: classId, semester, status: { $ne: STATUS.DELETED } }).populate('roomId');
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
  if (!startDate || !dayOfWeek) {
    return []
  }
  let day = moment(startDate, 'DD-MM-YYYY');
  let flag = 0
  if (!week.hasOwnProperty(dayOfWeek)) {
    throw new Error(dayOfWeek_wrong)
  }
  while (day.format('dddd') !== week[dayOfWeek]) {
    flag = flag + 1
    if (flag > 10) {
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
  validateDays,
  getMarksOfStudent
}