import _ from 'lodash'
import { LoggerUtils } from '../../../../utils';
import {
    AUDIT_LOG_ACTION,
    AUDIT_LOG_MODEL,
    AUDIT_LOG_FORMAT
  } from '../../../../config'

const ForumPostLikeDislikeModel = require('./model')

const currentFileName = require('path').basename(__filename)

module.exports = {
    async create(req, forumPostId){
        const userId = req.currentUser.id
        const { isLike } = req.body
        const dataCreate = {userId, forumPostId, isLike}
        let existedLike = await ForumPostLikeDislikeModel.fineOne({userId, forumPostId})
        let like = {}
        if (existedLike && isLike === existedLike.isLike){
            return dataCreate
        }
        else if (existedLike && isLike !== existedLike.isLike){
            like = await ForumPostLikeDislikeModel.update({isLike}, {userId, forumPostId})
        }
        else{
            like = await ForumPostLikeDislikeModel.create(dataCreate)
        }
        const returnedData = _.pick(like, ['userId', 'forumPostId', 'isLike'])
        LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.CREATE, AUDIT_LOG_MODEL.FORUM_POST, JSON.stringify(returnedData))
        return returnedData
    },

    async delete(req, forumPostId){
        const userId = req.currentUser.id
        const deleteCondition = {userId, forumPostId}
        try{
            const like = await ForumPostLikeDislikeModel.delete(deleteCondition)
            const returnedData = _.pick(like, ['userId', 'forumPostId'])
            LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.DELETE, AUDIT_LOG_MODEL.FORUM_POST, JSON.stringify(returnedData))
            return returnedData
        } catch{
            console.log("No like to delete")
            return {message: "success"}
        }
    },
}