import _ from 'lodash'
const { Op } = require("sequelize");

const NewsModel = require('./model')
import { LoggerUtils } from '../../utils';
import {
  AUDIT_LOG_ACTION,
  AUDIT_LOG_MODEL,
  AUDIT_LOG_FORMAT
} from '../../config'

import { create } from 'lodash';
import { paginateResult } from '../../utils/Pagination'

const currentFileName = require('path').basename(__filename)

module.exports = {
  async listNews(req) {
    const pageSize = parseInt(req.query.pageSize ? req.query.pageSize : 10)
    const page = parseInt(req.query.page ? req.query.page : 1)
    const offset = page * pageSize - pageSize
    const search = {isDeleted: false}
    const attributes = ["id", "title", "htmlContent", "summary", "thumbnailURL", "createdAt", "status"]
    const order = [
      ['createdAt', 'DESC'],
    ]
    const { count, rows } = await NewsModel.list(attributes, search, pageSize, offset, order)
    return paginateResult(count.length, page, pageSize, rows)
  },

  async getNewsById(newsId) {
    const news = await NewsModel.getById(newsId)
    return news
  },

  async createNews(req) {
    const { title, summary, htmlContent, thumbnailURL, status } = req.body
    if (!title || !htmlContent || !thumbnailURL || !status)
      throw new Error("Data is missing.")
    const createdBy = req.currentUser.id
    const dataCreate = { title, summary, htmlContent, createdBy, thumbnailURL, status }
    const news = await NewsModel.create(dataCreate)
    const returnedData = _.pick(news, ['id', 'title', 'summary', 'htmlContent', 'createdBy', 'thumbnailURL'])
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.CREATE, AUDIT_LOG_MODEL.NEWS, JSON.stringify(returnedData))
    return news
  },

  async uploadThumbnailPicture(newsId, files) {
    // const newFile = files[0]
    // await NewsModel.update(newsId, {thumbnailURL: newFile.filename})
    return
  },

  async updateNews(currentUser, data) {
    data.modifiedBy = currentUser.id
    const news = await NewsModel.update(data.id, data)
    const returnedData = _.pick(news, ['id', 'title', 'summary', 'htmlContent', 'createdBy', 'thumbnailURL'])
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.UPDATE, AUDIT_LOG_MODEL.NEWS, JSON.stringify(returnedData))
    return returnedData
  },

  async deleteNews(currentUser, data) {
    data.modifiedBy = currentUser.id
    data.isDeleted = 1
    data.status = 1
    const news = await NewsModel.delete(data.id, data)
    const returnedData = _.pick(news, ['id', 'title', 'summary', 'htmlContent', 'createdBy', 'thumbnailURL'])
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.DELETE, AUDIT_LOG_MODEL.NEWS, JSON.stringify(returnedData))
    return returnedData
  },
}