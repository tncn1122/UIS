import _ from 'lodash'
import { LoggerUtils } from '../../../../utils';
import {
    AUDIT_LOG_ACTION,
    AUDIT_LOG_MODEL,
    AUDIT_LOG_FORMAT
  } from '../../../../config'

const NewsCommentLikeModel = require('./model')

const currentFileName = require('path').basename(__filename)

module.exports = {
    async createNewsCommentLike(req, newsId, newsCommentId){
        const userId = req.currentUser.id
        const dataCreate = {userId, newsId, newsCommentId}
        try{
            const like = await NewsCommentLikeModel.create(dataCreate)
            const returnedData = _.pick(like, ['userId', 'newsCommentId'])
            LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.CREATE, AUDIT_LOG_MODEL.NEWS_COMMENT_LIKE, JSON.stringify(returnedData))
            return returnedData
        } catch{
            throw new Error ("Like already created")
        }
    },

    async deleteNewsCommentLike(req, newsId, newsCommentId){
        const userId = req.currentUser.id
        const deleteCondition = {userId, newsCommentId}
        try{
            const like = await NewsCommentLikeModel.delete(deleteCondition)
            const returnedData = _.pick(like, ['userId', 'newsCommentId'])
            LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.DELETE, AUDIT_LOG_MODEL.NEWS_COMMENT_LIKE, JSON.stringify(returnedData))
            return returnedData
        } catch{
            console.log("No like to delete")
            return {message: "success"}
        }
    },
}