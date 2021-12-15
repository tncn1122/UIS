const mongoose = require('mongoose');
const baseSchema = require('./BaseSchema')

const modelName = 'Room'

const roomSchema = baseSchema.CreateSchema({
  roomId: {
    type: String,
    require: true,
    trim: true
  },
  slots: {
    type: Number,
    require: true
  }
}, modelName)

const room = mongoose.model(modelName, roomSchema);

module.exports = room;