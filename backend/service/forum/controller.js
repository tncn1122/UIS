const { Op } = require("sequelize");

import { paginateResult } from '../../utils/Pagination'
import { findOne } from './model';

const ForumModel = require('./model')

module.exports = {
    async list(req, categoryId){
        const page = parseInt(req.query.page ? req.query.page : 1)
        const pageSize = parseInt(req.query.pageSize ? req.query.pageSize : 10)
        const offset = page * pageSize - pageSize
        const search = {forumCategoryId: categoryId}
        const attributes = ["id", "title", "createdAt", "updatedAt"]
        const order = [
            ['createdAt', 'DESC'],
            ['updatedAt', 'DESC']
        ]
        const { count, rows } = await ForumModel.list(attributes, search, pageSize, offset, order)
        return paginateResult(count, page, pageSize, rows)
    },

    async getById(forumId){
        const attributes = ["id", "name", "status", "createdAt", "updatedAt", "forumCategoryId", "createdBy"]
        const forum = await ForumModel.findOne(forumId, attributes)
        return forum
    }
}