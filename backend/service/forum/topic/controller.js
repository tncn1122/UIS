const { Op } = require("sequelize");

import { _ } from 'lodash';
import { paginateResult } from '../../../utils/Pagination'

import { LoggerUtils } from '../../../utils';
import {
    AUDIT_LOG_ACTION,
    AUDIT_LOG_MODEL,
    AUDIT_LOG_FORMAT
  } from '../../../config'


const ForumTopicModel = require('./model')
const currentFileName = require('path').basename(__filename)

module.exports = {
    async list(req, forumId){
        const pageSize = parseInt(req.query.pageSize ? req.query.pageSize : 10)
        const page = parseInt(req.query.page ? req.query.page : 1)
        const offset = page * pageSize - pageSize
        const search = {forumId}
        const attributes = ["id", "title", "summary", "createdAt", "updatedAt"]
        const order = [
            ['createdAt', 'DESC'],
            ['updatedAt', 'DESC']
        ]
        const { count, rows } = await ForumTopicModel.list(attributes, search, pageSize, offset, order)
        return paginateResult(count.length, page, pageSize, rows)
    },

    async create(req, forumId){
        console.log("")
        const { title, summary } = req.body
        if (!title || !summary)
            throw new Error("Missing title or summary")
        const createdBy = req.currentUser.id
        const dataCreate = {title, summary, createdBy, forumId}
        const topic = await ForumTopicModel.create(dataCreate)
        const returnedData = _.pick(topic, ['id', 'title', 'summary', 'createdBy', 'forumId'])
        LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.CREATE, AUDIT_LOG_MODEL.NEWS_COMMENT, JSON.stringify(returnedData))
        return topic
    },

    async getById(topicId){
        const attributes = ["id", "title", "summary", "status", "createdAt", "updatedAt", "forumId", "createdBy"]
        const forum = await ForumTopicModel.findOne(topicId, attributes)
        return forum
    }

}