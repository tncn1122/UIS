import _ from 'lodash'

const { Op } = require("sequelize");

import { LoggerUtils } from '../../../utils';
import {
    AUDIT_LOG_ACTION,
    AUDIT_LOG_MODEL,
    AUDIT_LOG_FORMAT
  } from '../../../config'

import { paginateResult } from '../../../utils/Pagination'

const ForumPostModel = require('./model')

const currentFileName = require('path').basename(__filename)

module.exports = {
    async list(req, forumTopicId){
        const pageSize = parseInt(req.query.pageSize ? req.query.pageSize : 10)
        const page = parseInt(req.query.page ? req.query.page : 1)
        const offset = page * pageSize - pageSize
        const search = {forumTopicId}
        const attributes = ["id", "htmlContent", "createdAt", "updatedAt"]
        const userId = req.currentUser ? req.currentUser.id : null
        const order = [
            ['createdAt', 'ASC'],
            ['updatedAt', 'ASC']
        ]
        const { count, rows } = await ForumPostModel.list(attributes, search, pageSize, offset, order, userId)
        return paginateResult(count.length, page, pageSize, rows)
    },

    async create(req, forumTopicId) {
        const { htmlContent } = req.body
        if (!htmlContent)
            throw new Error("Post's content must not be empty")
        const createdBy = req.currentUser.id
        const dataCreate = { htmlContent, forumTopicId, createdBy}
        const post = ForumPostModel.create(dataCreate)
        const returnedData = _.pick(post, ['id', 'htmlContent', 'userId', 'forumTopicId'])
        LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.CREATE, AUDIT_LOG_MODEL.FORUM_POST, JSON.stringify(returnedData))
        return post
    }
}