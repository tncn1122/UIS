const auth = require('../middleware/auth');
const ErrorUtil = require('../util/ErrorUtil');
const ResponseUtil = require('../util/Response');
var express = require('express');
const bcrypt = require('bcryptjs');
const RollCallReport = require('../models/RollCallReport');
const ClassInfo = require('../models/ClassInfo');
const stringMessage = require('../value/string');
const QR = require('../util/QR');
const router = express.Router();
const userUtil = require('../util/UserUtils');
const classUtil = require('../util/ClassUtils');
const reportUtil = require('../util/ReportUtils');
const styleWorkbook = require('../util/StyleWorkbook');
const excel = require('excel4node');
const rollcallReport = require('../models/RollCallReport');
const { findClass, getTeacherOfClass, getStudentInSubject } = require('../util/ClassUtils');
const { getDate } = require('../util/TimeUtils');
const Rollcall = require('../models/Rollcall');



/**
 * @typedef ListReports
 * @property {integer} count.required - số lượng phần tử
 * @property {Array.<RollCallReport>} data.required - các phần tử
 */

/**
 * @typedef ReportConfig
 * @property {string} checkinLimitTime.required - Thời gian giới hạn điểm danh
 * @property {boolean} allowLate.required - Cho phép đi trễ
 */
/**
 * @typedef TeacherCheckin
 * @property {string} studentId.required - Id của sinh viên điểm danh
 */

/**
 * Tạo danh sách điểm danh. Chỉ có tài khoản có quyền Admin hoặc teacher mới thực hiện được chức năng này.
 * @route POST /reports/{subjectId}/{semester}
 * @group Report
 * @param {string} subjectId.path.required - id lớp cần điểm danh
 * @param {string} semester.path.required - mã học kì lớp cần điểm danh
 * @param {ReportConfig.model} config.body.required - config cho bảng điểm danh
 * @returns {ListReports.model} 200 - Thông tin tài khoản và token ứng với tài khoản đó.
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
router.post('/:subjectId/:semester', auth.isReporter, async (req, res) => {
  // Create a new report
  try {
    const subjecId = req.params.subjectId
    const semester = req.params.semester
    const subjectInfo = await findClass(subjecId, semester)
    const subTeacher = await getTeacherOfClass(subjectInfo)

    if (subTeacher && req.user.userId !== subTeacher.userId && req.user.role !== 'admin') {
      throw new Error(stringMessage.not_auth);
    }
    let idx = reportUtil.isAbleCreatedReport(subjectInfo.schedule);
    if (idx == -1) {
      throw new Error(stringMessage.create_report_time_expired);
    }

    let report = await reportUtil.findReport(getDate(), subjectInfo)
    if (report) {
      return res.status(200).send(ResponseUtil.makeResponse(report));
    }
    const rollcallReportId = reportUtil.genReportId(subjectInfo.subjectId, subjectInfo.schedule[idx])


    const listStudents = await getStudentInSubject(subjectInfo)
    const content = await reportUtil.generateReportContent(rollcallReportId, listStudents)

    report = {
      rollcallReportId,
      ...req.body,
      subjectId: subjectInfo,
      content,
      expired: subjectInfo.shift === '0' ? '11:30' : '16:30',
    }
    const newReport = new RollCallReport(report);
    await newReport.save();
    res.status(201).send(ResponseUtil.makeResponse(report));
  } catch (error) {
    console.log(error);
    if (error.code == 11000) {
      return res.status(400).send(ResponseUtil.makeMessageResponse(ErrorUtil.makeErrorValidateMessage(JSON.stringify(error.keyValue))));
    }
    res.status(400).send(ResponseUtil.makeMessageResponse(error.message))
  }
})

/**
 * Lấy tất cả danh sách điểm danh theo môn. Chỉ có tài khoản có quyền Admin hoặc teacher mới thực hiện được chức năng này.
 * @route GET /reports/{subject_id}
 * @group Report
 * @param {string} subject_id.path.required - id lớp cần điểm danh
 * @returns {ListReports.model} 200 - Thông tin tài khoản và token ứng với tài khoản đó.
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
router.get('/:subject_id', auth.isReporter, async (req, res) => {
  // Create a new report
  try {
    const report = await RollCallReport.find({ subject: req.params.subject_id }).populate({
      path: 'content',
      populate: {
        path: 'user',
        model: 'User'
      }
    });

    if (report) {
      return res.status(201).send(ResponseUtil.makeResponse(report));
    }
    else {
      return res.status(404).send(ResponseUtil.makeMessageResponse(stringMessage.report_not_found));
    }

  } catch (error) {
    console.log(error);
    res.status(400).send(ResponseUtil.makeMessageResponse(error.message))
  }
})

/**
 * Lấy dữ liệu điểm danh của lớp theo ngày.
 * @route GET /reports/{subject_id}/{date}/status
 * @group Report
 * @param {string} id.path.required - id của lớp
 * @param {string} date.path.required - ngày, format dd:mm:yyyy
 * @returns {ListReports.model} 200 - Report
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
router.get('/:subject_id/:semester/:date/status', async (req, res) => {
  // Create a new report
  try {
    const subject_id = req.params.subject_id
    const semester = req.params.semester
    const stringDate = req.params.date

    const subjectObj = await classUtil.findClass(subject_id, semester)
    let report = await reportUtil.findReport(stringDate, subjectObj)

    if (report) {
      console.log(report);
      return res.status(200).send(ResponseUtil.makeResponse(report));
    }
    else {
      return res.status(404).send(ResponseUtil.makeMessageResponse(stringMessage.report_not_found));
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(ResponseUtil.makeMessageResponse(error.message))
  }
})



/**
 * Tải về tổng hợp danh sách điểm danh của một môn.
 * @route GET /reports/{subject_id}/download-all
 * @group Report
 * @param {string} subject_id.path.required - id môn học
 * @returns {Error.model} 200 - File excel chứa report.
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 */
router.get('/:subject_id/download-all', async (req, res) => {
  // Create a new report
  try {
    console.log(req.params.subject_id);
    let reportFile = await genExcelReportAll(req.params.subject_id);
    reportFile.write('Report.xlsx', res);
  } catch (error) {
    console.log(error);
    res.status(400).send(ResponseUtil.makeMessageResponse(error.message))
  }
})


/**
 * Tải về danh sách điểm danh.
 * @route GET /reports/{id}/download
 * @group Report
 * @param {string} id.path.required - id bảng điểm danh
 * @returns {Error.model} 200 - File excel chứa report.
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 */
router.get('/:id/download', async (req, res) => {
  // Create a new report
  try {
    let reportFile = await genExcelReport(req.params.id);
    reportFile.write('Report.xlsx', res);
  } catch (error) {
    console.log(error);
    res.status(400).send(ResponseUtil.makeMessageResponse(error.message))
  }
})


/**
 * Lấy dữ liệu điểm danh.
 * @route GET /reports/{id}/status
 * @group Report
 * @param {string} id.path.required - id report
 * @returns {ListReports.model} 200 - Report
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
router.get('/:id/status', async (req, res) => {
  // Create a new report
  try {
    let report = await findReportById(req.params.id);
    if (report) {
      return res.status(200).send(ResponseUtil.makeResponse(report));
    }
    else {
      return res.status(404).send(ResponseUtil.makeMessageResponse(stringMessage.report_not_found));
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(ResponseUtil.makeMessageResponse(error.message))
  }
})







/**
 * Điểm danh. Chỉ có tài khoản sinh viên mới thực hiện được chức năng này.
 * @route PUT /reports/{id}/checkin
 * @group Report
 * @param {string} id.path.required - id bảng điểm danh
 * @returns {Error.model} 200 - trạng thái điểm danh: ontime, late hoặc absent.
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
router.put('/:id/checkin', auth.isStudent, async (req, res) => {
  // Create a new report
  try {
    let student = req.user;
    let report = await findReportById(req.params.id);
    //console.log(report);
    let rollcallStatus = reportUtil.getStatusCheckin(report);
    // if(!reportUtil.isAbleToCheckin(report.date)){
    //     return res.status(400).send(ResponseUtil.makeMessageResponse(stringMessage.user_cant_checkin_bc_date));
    // }
    const rollCall = await reportUtil.findRollcall(report.rollcallReportId, student)
    if (rollCall) {
      await Rollcall.findOneAndUpdate({rollcallReportId: rollCall.rollcallReportId, studentId: rollCall.studentId}, {rollcallStatus})
      
      //console.log(ResponseUtil.makeMessageResponse(stringMessage[status]));
      return res.status(200).send(ResponseUtil.makeMessageResponse(stringMessage[rollcallStatus]));
    }
    return res.status(400).send(ResponseUtil.makeMessageResponse(stringMessage.student_not_in_subject));


  } catch (error) {
    console.log(error);
    res.status(400).send(ResponseUtil.makeMessageResponse(error.message))
  }
})

/**
 * Điểm danh bởi giáo viên. Chỉ có tài khoản giáo viên mới thực hiện được chức năng này. Dùng điện thoại để quét QR/thẻ sinh viên để điểm danh.
 * @route POST /reports/{id}/teachercheckin
 * @group Report
 * @param {string} id.path.required - id bảng điểm danh
 * @param {TeacherCheckin.model} studentId.body.required - Id của student cần điểm danh
 * @returns {Error.model} 200 - trạng thái điểm danh: ontime, late hoặc absent.
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
router.put('/:id/teachercheckin', auth.isTeacher, async (req, res) => {
  // Create a new report
  try {
    let studentId = req.user.body.studentId;
    let report = await findReportById(req.params.id);
    let student = await userUtil.findUser(studentId)
    if (!student) {
      throw new Error(stringMessage.user_not_found);
    }
    let rollcallStatus = reportUtil.getStatusCheckin(report);
    if (rollCall) {
      await Rollcall.findOneAndUpdate({rollcallReportId: rollCall.rollcallReportId}, {rollcallStatus})
      
      //console.log(ResponseUtil.makeMessageResponse(stringMessage[status]));
      return res.status(200).send(ResponseUtil.makeMessageResponse(stringMessage[rollcallStatus]));
    }
    return res.status(400).send(ResponseUtil.makeMessageResponse(stringMessage.student_not_in_subject));



  } catch (error) {
    console.log(error);
    res.status(400).send(ResponseUtil.makeMessageResponse(error.message))
  }
})



// async function findClass(subjectId) {
//   const subjectInfo = await ClassInfo.findOne({ id: subjectId }).populate('students').populate('monitors').populate('teacher');
//   if (!subjectInfo) {
//     throw new Error(stringMessage.subject_not_found);
//   }
//   return subjectInfo;
// }

// async function findReport(date, subject, shift) {
//   const report = await RollCallReport.findOne({ date: date, subject: subject, shift: shift }).populate({
//     path: 'content',
//     populate: {
//       path: 'user',
//       model: 'User'
//     }
//   });
//   return report;
// }



async function findAllReportBySubject(subject_id) {
  return await RollCallReport.findOne({ subject: subject_id }).populate({
    path: 'content',
    populate: {
      path: 'user',
      model: 'User'
    }
  });
}

async function findClassInfo(subjectId) {
  const subjectInfo = await ClassInfo.findOne({ id: subjectId }).populate('teacher');
  if (!subjectInfo) {
    throw new Error(stringMessage.subject_not_found);
  }
  return subjectInfo;
}

async function findReportById(reportId) {
  const report = await RollCallReport.findOne({ rollcallReportId: reportId }).populate({
    path: 'subjectId',
    populate: {
      path: 'roomId',
      model: 'Room'
    }
  }).populate({
    path: 'content',
    populate: {
      path: 'studentId',
      populate: {
        path: 'majorId',
        model: 'Major',
        populate: {
          path: 'departmentId',
          model: 'Department',
        }
      }
    }
  });
  if (!report) {
    throw new Error(stringMessage.report_not_found);
  }
  return report;
}

async function genExcelReport(reportId) {
  let report = await findReportById(reportId);
  //console.log(report.content[0].user);
  let subjectInfo = await findClassInfo(report.subject);
  let workbook = new excel.Workbook();
  let reportSheet = workbook.addWorksheet(report.date);

  let title = "Báo Cáo Điểm Danh";
  let subject = "Môn: " + subjectInfo.name;
  let teacher = "Giảng viên: " + subjectInfo.teacher.name;
  let shift = report.shift == 0 ? 'Sáng' : 'Chiều';
  let date = "Buổi: " + shift + " - Ngày: " + report.date;

  let titleStyle = workbook.createStyle(styleWorkbook.titleStyle);

  let rowTitleStyle = workbook.createStyle(styleWorkbook.rowTitleStyle);

  let rowStyle = workbook.createStyle(styleWorkbook.rowStyle);

  //let border = workbook.createStyle(styleWorkbook.border);

  reportSheet.cell(1, 1, 1, 5, true).string(title).style(titleStyle);
  reportSheet.cell(2, 1, 2, 5, true).string(subject).style(titleStyle);
  reportSheet.cell(3, 1, 3, 5, true).string(teacher).style(titleStyle);
  reportSheet.cell(4, 1, 4, 5, true).string(date).style(titleStyle);

  reportSheet.cell(5, 1).string('STT').style(rowTitleStyle);
  reportSheet.cell(5, 2).string('MSSV').style(rowTitleStyle);
  reportSheet.cell(5, 3).string('TÊN').style(rowTitleStyle);
  reportSheet.cell(5, 4).string(report.date).style(rowTitleStyle);

  let curCell = 6;
  let total = 0;
  let total_late = 0;
  let total_absent = 0;
  let total_ontime = 0;
  for (const item of report.content) {
    //console.log(item.user);
    if (item.user === null) {
      continue;
    }
    reportSheet.cell(curCell, 1).number(++total).style(rowStyle);
    reportSheet.cell(curCell, 2).string(item.user.id).style(rowStyle);
    reportSheet.cell(curCell, 3).string(item.user.name).style(rowStyle);

    switch (item.status) {
      case 'ontime': {
        reportSheet.cell(curCell, 4).string(stringMessage.ontime).style(rowStyle);
        total_ontime++;
        break;
      }
      case 'late': {
        reportSheet.cell(curCell, 4).string(stringMessage.late).style(rowStyle);
        total_late++;
        break;
      }
      case 'absent': {
        reportSheet.cell(curCell, 4).string(stringMessage.absent).style(rowStyle);
        total_absent++;
        break;
      }
    }
    curCell++;
  }
  reportSheet.column(2).setWidth(15);
  reportSheet.column(3).setWidth(30);
  curCell += 2;
  reportSheet.cell(curCell, 1).string("Tổng số").style(rowTitleStyle);
  reportSheet.cell(curCell++, 2).number(total).style(rowTitleStyle);
  reportSheet.cell(curCell, 1).string("Đúng giờ:").style(rowStyle);
  reportSheet.cell(curCell++, 2).number(total_ontime).style(rowStyle);
  reportSheet.cell(curCell, 1).string("Trễ:").style(rowStyle);
  reportSheet.cell(curCell++, 2).number(total_late).style(rowStyle);
  reportSheet.cell(curCell, 1).string("Vắng:").style(rowStyle);
  reportSheet.cell(curCell, 2).number(total_absent).style(rowStyle);
  return workbook;
}

async function genExcelReportAll(subjectId) {
  let report = await findAllReportBySubject(subjectId)
  //console.log(report.content[0].user);
  //console.log(subjectId);
  let subjectInfo = await findClass(subjectId);
  console.log(subjectInfo);
  let workbook = new excel.Workbook();
  let reportSheet = workbook.addWorksheet(subjectInfo.id);


  let title = "Báo Cáo Điểm Danh";
  let subject = "Môn: " + subjectInfo.name;
  let teacher = "Giảng viên: " + subjectInfo.teacher.name;
  let shift = subjectInfo.shift == 0 ? 'Sáng' : 'Chiều';
  let date = "Buổi: " + shift + " - Ngày bắt đầu: " + (subjectInfo.schedule[0].split('@')[1]);

  let titleStyle = workbook.createStyle(styleWorkbook.titleStyle);

  let rowTitleStyle = workbook.createStyle(styleWorkbook.rowTitleStyle);

  let rowStyle = workbook.createStyle(styleWorkbook.rowStyle);
  //let border = workbook.createStyle(styleWorkbook.border);

  reportSheet.cell(1, 1, 1, 5, true).string(title).style(titleStyle);
  reportSheet.cell(2, 1, 2, 5, true).string(subject).style(titleStyle);
  reportSheet.cell(3, 1, 3, 5, true).string(teacher).style(titleStyle);
  reportSheet.cell(4, 1, 4, 5, true).string(date).style(titleStyle);

  reportSheet.cell(5, 1).string('STT').style(rowTitleStyle);
  reportSheet.cell(5, 2).string('MSSV').style(rowTitleStyle);
  reportSheet.cell(5, 3).string('TÊN').style(rowTitleStyle);


  const studentPosition = new Map();
  let pos = 6;
  let total = 0;
  for (student of subjectInfo.students) {
    console.log(student);
    if (student) {
      studentPosition.set(student.id, pos);
      reportSheet.cell(pos, 1).number(++total).style(rowStyle);
      reportSheet.cell(pos, 2).string(student.id).style(rowStyle);
      reportSheet.cell(pos, 3).string(student.name).style(rowStyle);
      pos++;
    }
  }
  let reportCol = 4;
  for (const date of subjectInfo.schedule) {
    //console.log(item.user);
    let dateInfo = date.split('@');
    let report = await findReport(dateInfo[1], subjectInfo.id, dateInfo[0]);
    reportSheet.cell(5, reportCol).string(dateInfo[1]).style(rowTitleStyle);
    if (report) {
      // put dữ liệu điểm danh
      for (const item of report.content) {
        //console.log(item.user);
        if (item.user === null) {
          continue;
        }
        console.log(item);
        console.log(studentPosition.get(item.user.id) + " " + reportCol)
        switch (item.status) {
          case 'ontime': {
            reportSheet.cell(studentPosition.get(item.user.id), reportCol).string(stringMessage.ontime).style(rowStyle);

            break;
          }
          case 'late': {
            reportSheet.cell(studentPosition.get(item.user.id), reportCol).string(stringMessage.late).style(rowStyle);

            break;
          }
          case 'absent': {
            reportSheet.cell(studentPosition.get(item.user.id), reportCol).string(stringMessage.absent).style(rowStyle);

            break;
          }
        }
      }
    }
    reportCol++;
  }
  console.log({ pos: pos, reportCol: reportCol });
  reportSheet.cell(5, 4, pos - 1, reportCol - 1).style(rowStyle);
  reportSheet.column(2).setWidth(15);
  reportSheet.column(3).setWidth(30);
  return workbook;
}



module.exports = router;