const mongoose = require('mongoose');
const QR = require('../util/QR');
const { CreateSchema } = require('./BaseSchema');
const modelName = 'Classroom'

const classRoomSchema = CreateSchema({
  id: {
    type: String,
    unique: true,
    require: true,
    trim: true
  },
  stringDate: [
    {
      type: String,
      require: true
    }
  ]
}, modelName)

const classRoom = mongoose.model(modelName, classRoomSchema);

module.exports = classRoom;