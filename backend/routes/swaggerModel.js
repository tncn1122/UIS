/**
 * @typedef Error 
 * @property {string} message
 */


/**
 * @typedef User
 * @property {string} userId.required
 * @property {string} firstName.required
 * @property {string} lastName.required
 * @property {string} email.required
 * @property {string} password.required
 * @property {enum} role.required  - Một trong các role sau đây: - eg: student, teacher, admin
 * @property {string} qrUrl
 * @property {string} avtUrl
 * @property {string} majorId.required
 * @property {string} token
 * @property {date} birthDate.required
 * @property {string} birthplace.required
 * @property {string} majorId.required
 * @property {string} phone.required
 * @property {integer} sex.required
 * @property {string} idNo.required
 * @property {string} address.required
 */








/**
 * @typedef Department
 * @property {string} departmentId.required
 * @property {string} name.required
 */



/**
 * @typedef Major
 * @property {string} majorId.required
 * @property {string} name.required
 * @property {Department.model} departmentId.required
 */


/**
 * @typedef MajorInfo
 * @property {string} majorId.required
 * @property {string} name.required
 * @property {string} departmentId.required
 */


/**
 * @typedef Room
 * @property {string} roomId.required
 * @property {integer} slots.required
 */


/**
 * @typedef Subject
 * @property {string} subjectId.required
 * @property {string} semester.required
 * @property {Room.model} roomId.required 
 * @property {string} name.required
 * @property {integer} credits.required
 * @property {integer} shift.required
 * @property {date} startDate.required
 * @property {integer} days.required
 * @property {Array.<string>} schedule.required
 * @property {string} dayOfWeek.required
 * @property {enum} role.required  - Một trong các role sau đây: - eg: '2', '3', '4', '5', '6', '7'
 * @property {integer} percentDiligence.required
 * @property {integer} percentTest.required
 * @property {integer} percentPractice.required
 * @property {integer} percentSerminar.required
 * @property {integer} percentExam.required
 */
