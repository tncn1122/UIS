module.exports = {
  STATUS: {
    ACTIVE: 'ACTIVE',
    DELETED: 'DELETED'
  },
  ENUM_ROLE: ['admin', 'student', 'teacher'],
  ROLLCALL_STATUS: {
    ENUM: ['late', 'ontime', 'absent'],
    LATE: 'late',
    ONTIME: 'ontime',
    ABSENT: 'absent',
    MAP: {
      late: 'Trễ',
      ontime: 'Đúng giờ',
      absent: 'Vắng',
    }
  }
};