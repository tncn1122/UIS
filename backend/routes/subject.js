const auth = require('../middleware/auth');
const ErrorUtil = require('../util/ErrorUtil');
const ResponseUtil = require('../util/Response');
var express = require('express');
const bcrypt = require('bcryptjs')
const ClassInfo = require('../models/ClassInfo');
const User = require('../models/User');
const stringMessage = require('../value/string');
const QR = require('../util/QR')
const router = express.Router()
const classUtil = require('../util/ClassUtils')
const userUtil = require('../util/UserUtils')
const moment = require('moment-timezone');
const Subject = require('../models/Subject');
const Room = require('../models/Room');
const { room_not_found, subject_not_found } = require('../value/string');
const { STATUS } = require('../value/model');
const subjectStudent = require('../models/SubjectStudent');
const SubjectStudent = require('../models/SubjectStudent');
const { populate } = require('../models/User');
const SubjectTeacher = require('../models/SubjectTeacher');

/**
 * @typedef ListClasses
 * @property {integer} count.required - số lượng phần tử
 * @property {Array.<Subject>} data.required - các phần tử
 */

/**
 * Tạo lớp. Chỉ có tài khoản có quyền Admin mới thực hiện được chức năng này.
 * @route POST /subjects/
 * @group Class
 * @param {SubjectInput.model} subject_info.body.required - Body là file json chứa thông tin lớp, những mục (students, monitors) có thể không cần gửi trong json.
 * @returns {ListClasses.model} 200 - Thông tin tài khoản và token ứng với tài khoản đó.
 * @returns {Error.model} 400 - Thông tin trong Body bị sai hoặc thiếu.
 * @returns {Error.model} 401 - Không có đủ quyền để thực hiện chức năng.
 * @security Bearer
 */
router.post('/', auth.isAdmin, async (req, res) => {
  // Create a new class
  try {
    const roomId = await Room.findOne({ roomId: req.body.roomId, status: { $ne: STATUS.DELETED } })
    if (!roomId) {
      throw new Error(room_not_found)
    }
    let classInfo = classUtil.createBaseClassInfo(req.body);
    classInfo.roomId = roomId

    // if (req.body.hasOwnProperty('dateStart')) {
    //   if (!classUtil.validateDate(classInfo.dateStart)) {
    //     throw new Error(stringMessage.date_wrong);
    //   }
    // }
    // else {
    //   classInfo.dateStart = classUtil.formatDate(moment());
    // }

    const newClass = new Subject(classInfo);
    const savedSubject = await newClass.save();

    let teacher = null
    if (req.body.hasOwnProperty('teacherId')) {
      teacher = await User.findOne({ userId: req.body.teacherId, status: { $ne: STATUS.DELETED } });
      if (!teacher) {
        return res.status(404).send(ResponseUtil.makeMessageResponse(stringMessage.user_not_found + "Giảng viên mã: " + req.body.teacherId));
      }
      const subTeacher = new SubjectTeacher({
        teacherId: teacher,
        subjectId: savedSubject
      })
      await subTeacher.save()
    }

    let students = [];
    if (req.body.hasOwnProperty('students')) {
      students = await createStudentList(req.body.students);
      await Promise.all(students.forEach(async (item) => {
        const subTeacher = new SubjectStudent({
          studentId: item,
          subjectId: savedSubject
        })
        await subTeacher.save()
      }))
    }
    // update student

    // update teacher

    res.status(201).send(ResponseUtil.makeResponse({
      ...savedSubject.toObject(),
      teacher,
      students
    }));
    // res.status(200).send(ResponseUtil.makeMessageResponse("Ok thơm bơ"))
  } catch (error) {
    console.log(error);
    if (error.code == 11000) {
      return res.status(400).send(ResponseUtil.makeMessageResponse(ErrorUtil.makeErrorValidateMessage(JSON.stringify(error.keyValue))));
    }
    res.status(400).send(ResponseUtil.makeMessageResponse(error.message))
  }
})

/**
 * Get tất cả lớp hiện có. Chỉ có tài khoản quyền Admin mới thực hiện được chức năng này.
 * @route GET /subjects/
 * @group Class
 * @returns {ListClasses.model} 200 - Thông tin tài khoản và token ứng với tài khoản đó.
 * @returns {Error.model} 500 - Lỗi.
 * @security Bearer
 */
router.get('/', auth.isAdmin, async (req, res) => {
  try {
    const subjects = await Subject.find({}).populate('roomId');
    const listSubject = await Promise.all(subjects.map(async (item) => {
      const subjectObj = item.toObject()
      const students = await getStudentInSubject(subjectObj)
      const teacher = await getTeacherInSubject(subjectObj)
      return {
        ...subjectObj,
        students,
        teacher
      }
    }))
    console.log(listSubject);
    res.status(200).send(ResponseUtil.makeResponse(listSubject))
  }
  catch (err) {
    res.status(500).send(ResponseUtil.makeMessageResponse(err.message));
  }
})

/**
 * Xóa một lớp khỏi hệ thống dựa vào ID, chỉ có Admin mới thực hiện được chức năng này.
 * @route DELETE /subjects/{id}
 * @group Class
 * @param {string} id.path.required ID của lớp cần xóa.
 * @returns {Error.model} 200 - "Xóa thành công!" nếu thao tác thành công.
 * @returns {Error.model} 500 - Lỗi.
 * @security Bearer
 */
router.delete('/:id', auth.isAdmin, async (req, res) => {
  try {
    let subjectId = req.params.id;
    const classInfo = await Subject.findOne({ subjectId, status: { $ne: STATUS.DELETED } }).populate('roomId');
    const students = await getStudentInSubject(classInfo)
    const teacher = await getTeacherInSubject(classInfo)
    if (classInfo) {
      await Subject.findOneAndUpdate({ subjectId, status: { $ne: STATUS.DELETED } }, { status: STATUS.DELETED }, { runValidators: true }, function (error, raw) {
        if (!error) {
          console.log("raw", subjectId, raw);
          if (raw) {
            raw.save();
            res.status(201).send(ResponseUtil.makeResponse({
              ...raw.toObject(),
              students,
              teacher
            }));
          }
          else {
            return res.status(404).send(ResponseUtil.makeMessageResponse(stringMessage.room_not_found));
          }
        }
        else {
          res.status(400).send(ResponseUtil.makeMessageResponse(error.message));
        }
      })
    }
    else {
      res.status(404).send(ResponseUtil.makeMessageResponse(stringMessage.class_not_found));
    }

  }
  catch (err) {
    res.status(500).send(ResponseUtil.makeMessageResponse(err.message));
  }
})

/**
 * Sửa một lớp dựa vào ID, chỉ có Admin mới thực hiện được chức năng này.
 * @route PUT /subjects/{id}
 * @group Class
 * @param {string} id.path.required Body của lớp cần sửa.
 * @param {Subject.model} class.body.required Body của lớp cần sửa.
 * @returns {Subject.model} 200 - Thông tin lớp nếu thao tác thành công.
 * @returns {Error.model} 500 - Lỗi.
 * @security Bearer
 */
router.put('/:id', auth.isAdmin, async (req, res) => {
  try {
    let subjectId = req.params.id; //old
    let classUpdate = req.body;  //new


    const classInfo = await classUtil.findClass(subjectId);
    if (!classInfo) {
      throw new Error(subject_not_found)
    }

    if (classUtil.isChangeExpired(classInfo.startDate)) {
      return res.status(400).send(ResponseUtil.makeMessageResponse(stringMessage.class_change_timeup));
    }

    const roomInfo = await Room.findOne({ roomId: classUpdate.roomId, status: { $ne: STATUS.DELETED } })
    if (!roomInfo) {
      throw new Error(room_not_found)
    }
    const schedule = classUtil.genSchedule(classUpdate.startDate, +
      classUpdate.shift, classUpdate.days, classUpdate.dayOfWeek);
    const bodyUpdate = {
      ...classUpdate,
      roomId: roomInfo,
      schedule
    }
    await Subject.findOneAndUpdate({ subjectId }, bodyUpdate, async function (error, raw) {
      if (!error) {
        if (raw) {
          await raw.save();
        }
        else {
          throw new Error(stringMessage.subject_not_found);
        }
      }
      else {
        throw new Error(error.message)
      }
    })

    const savedSubject = { ...classInfo.toObject(), ...bodyUpdate }

    // update teacher
    const teacher = await findUser(classUpdate.teacherId);
    await updateTeacherClass(teacher, classInfo);

    // update student
    const students = await createStudentList(classUpdate.students || []);
    await Promise.all(students.map(async (item) => {
      const subTeacher = new SubjectStudent({
        studentId: item,
        subjectId: savedSubject
      })
      await subTeacher.save()
    }))

    console.log(savedSubject);
    res.status(201).send(ResponseUtil.makeResponse({
      ...savedSubject,
      teacher,
      students
    }));
  }
  catch (err) {
    console.log(err);
    return res.status(500).send(ResponseUtil.makeMessageResponse(err.message));
  }
})

/**
 * Lấy thông tin của một lớp, user đã đăng nhập mới thực hiện được chức năng này.
 * @route GET /subjects/{id}
 * @group Class
 * @param {string} id.path.required ID của lớp cần lấy thông tin.
 * @returns {Class.model} 200 - Thông tin lớp nếu thao tác thành công.
 * @returns {Error.model} 500 - Lỗi.
 * @security Bearer
 */
router.get('/:id', auth.isUser, async (req, res) => {
  try {
    let subjectId = req.params.id;
    let classInfo = await findSubject(subjectId);
    if (classInfo) {
      classInfo = classInfo.toObject()
      const students = await getStudentInSubject(classInfo)
      const teacher = await getTeacherInSubject(classInfo)
      res.status(200).send(ResponseUtil.makeResponse({
        ...classInfo,
        students,
        teacher
      }));
    }
    else {
      res.status(404).send(ResponseUtil.makeMessageResponse(stringMessage.class_not_found));
    }

  }
  catch (err) {
    console.log(err)
    res.status(500).send(ResponseUtil.makeMessageResponse(error.message));
  }
})

async function getStudentInSubject(subjectObj) {
  const listStudents = await SubjectStudent.find({ subjectId: subjectObj, status: { $ne: STATUS.DELETED } }).populate({
    path: 'studentId',
    populate: {
      path: 'majorId',
      model: 'Major',
      populate: {
        path: 'departmentId',
        model: 'Department'
      }
    }
  })
  return listStudents.map((item) => {
    const { studentId } = item
    return studentId
  })
}

async function getTeacherInSubject(subjectObj) {
  const teacher = await SubjectTeacher.findOne({ subjectId: subjectObj, status: { $ne: STATUS.DELETED } }).populate({
    path: 'teacherId',
    populate: {
      path: 'majorId',
      model: 'Major',
      populate: {
        path: 'departmentId',
        model: 'Department'
      }
    }
  })
  return teacher?.teacherId
}

async function findStudent(userId) {
  return await User.findOne({ userId, status: { $ne: STATUS.DELETED } }).populate({
    path: 'majorId',
    populate: {
      path: 'departmentId',
      model: 'Department'
    }
  });
}

async function createStudentList(student_id_list) {
  let student_list = [];

  if (student_id_list && student_id_list.length > 0) {
    for (const student_id of student_id_list) {
      let student = await findStudent(student_id);
      if (student) {
        student_list.push(student);
      }
      else {
        throw new Error(stringMessage.user_not_found + " Sinh viên: " + student_id.userId);
      }
    }
  }
  return Promise.all(student_list);
}

async function findSubject(subjectId) {
  const classInfo = await Subject.findOne({ subjectId: subjectId }).populate('roomId');
  return classInfo;
}

async function updateStudentAfterChange(old_student_list, new_student_list, class_id) {
  const simple_old_students_id = old_student_list.map(item => item.id);
  const simple_new_students_id = new_student_list.map(item => item.id);
  const update_state = new Map();
  for (const id of simple_old_students_id) {
    update_state.set(id, 0);
  }

  for (const id of simple_new_students_id) {
    if (update_state.has(id)) {
      update_state.delete(id);
    }
    else {
      update_state.set(id, 1);
    }
  }

  await updateStudentClass(update_state, class_id);
}

async function updateStudentClass(student_state_list, class_id) {
  let student_list = [];
  //console.log((student_state_list));
  if (student_state_list) {
    for (const [key, value] of student_state_list) {
      let current_user = await findUser(key);
      if (value == 1) {
        // add class
        current_user.subjects.push(class_id);
      }
      else {
        // remove class
        current_user.subjects = current_user.subjects.filter(item => item !== class_id);
      }
      await User.findOneAndUpdate({ id: key }, current_user, async function (error, raw) {
        if (!error) {
          if (raw) {
            await raw.save();
          }
          else {
            throw new Error(stringMessage.user_not_found);
          }
        }
        else {
          throw new Error(ResponseUtil.makeMessageResponse(error.message))
        }
      });
    }
  }
  return Promise.all(student_list);
}

async function updateTeacherClass(teacherObj, classObj) {
  await SubjectTeacher.findOneAndUpdate({ subjecId: classObj }, { teacherId: teacherObj }, async function (error, raw) {
    if (!error) {
      if (raw) {
        await raw.save();
      }
      else {
        const subTeacher = new SubjectTeacher({
          subjectId: classObj,
          teacherId: teacherObj
        })
        await subTeacher.save()
      }
    }
    else {
      throw new Error(ResponseUtil.makeMessageResponse(error.message))
    }
  });
}

async function findUser(userId) {
  let user = await User.findOne({ id: userId });
  if (user) {
    return user;
  }
  else {
    throw new Error(stringMessage.user_not_found);
  }

}


router.get('/delete/all', async (req, res) => {
  try {

    await ClassInfo.deleteMany({})
    res.status(200).send(ResponseUtil.makeMessageResponse("Delete success"))
  }
  catch (err) {
    res.status(500).send(ResponseUtil.makeMessageResponse(err.message))
  }
})


module.exports = router;