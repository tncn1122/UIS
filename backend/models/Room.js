const mongoose = require('mongoose');
const baseSchema = require('./BaseSchema')

const modelName = 'room'

const roomSchema = baseSchema.CreateSchema({
  roomId: {
    type: String,
    unique: true,
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