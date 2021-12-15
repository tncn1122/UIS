const mongoose = require('mongoose');
const { getRawDate } = require('../util/TimeUtils');
const modelEnum = require('../value/model')

const SchemaOptions = {
  timestamps: true
}

function CreateSchema(modelSchema, modelName){
  const baseSchema = mongoose.Schema({
    status: {
      type: String,
      default: modelEnum.STATUS.ACTIVE    // active or deleted
    },  
    ...modelSchema
  },
  SchemaOptions)

  baseSchema.methods.deleteById = async (id) => {
    const model = mongoose.model(modelName, baseSchema);
    return await model.findOneAndUpdate({ id: id, status: modelEnum.STATUS.DELETED })
  }

  return baseSchema
}

module.exports = {
  CreateSchema
}