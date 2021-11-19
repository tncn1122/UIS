import _ from 'lodash'
import { LoggerUtils } from '../../../../utils';
import {
    AUDIT_LOG_ACTION,
    AUDIT_LOG_MODEL,
    AUDIT_LOG_FORMAT
  } from '../../../../config'

const ViewModel = require('./model')

const currentFileName = require('path').basename(__filename)

module.exports = {
    async create(req, forumTopicId){
        const userId = req.currentUser.id
        const dataCreate = {userId, forumTopicId}
        try{
            const view = await ViewModel.create(dataCreate)
            const returnedData = _.pick(view, ['userId', 'forumTopicId'])
            LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.CREATE, AUDIT_LOG_MODEL.FORUM_TOPIC_VIEW, JSON.stringify(returnedData))
            return true
        } catch{
            console.log("View already created")
            return dataCreate
        }
    }
}