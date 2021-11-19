import _ from 'lodash'
const { Op } = require("sequelize");
import { LoggerUtils } from '../../../utils';
import {
    AUDIT_LOG_ACTION,
    AUDIT_LOG_MODEL,
    AUDIT_LOG_FORMAT
  } from '../../../config'

const CommentModel = require('./model')

import { paginateResult } from '../../../utils/Pagination'

const currentFileName = require('path').basename(__filename)

module.exports = {
    async listCommentsByNewsId(newsId, req){
        const pageSize = parseInt(req.query.pageSize ? req.query.pageSize : 50)
        const page = parseInt(req.query.page ? req.query.page : 1)
        const offset = page * pageSize - pageSize
        const search = {newsId: newsId}
        const attributes = ["id", "text"]
        const userId = req.currentUser.id
        const order = [
            ['createdAt', 'DESC']
        ]
        const { count, rows } = await CommentModel.list(attributes, search, pageSize, offset, order, userId)
        return paginateResult(count.length, page, pageSize, rows)
    },

    async createNewsComment(req, newsId, newsCommentParentId){
        const { text } = req.body
        if (!text)
            throw new Error("Comment must not be empty.")
        const userId = req.currentUser.id
        const dataCreate = {text, userId, newsId, newsCommentParentId}
        const comment = await CommentModel.create(dataCreate)
        const returnedData = _.pick(comment, ['id', 'text', 'userId', 'newsId'])
        LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.CREATE, AUDIT_LOG_MODEL.NEWS_COMMENT, JSON.stringify(returnedData))
        return comment
    }
}