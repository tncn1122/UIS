const { Op } = require("sequelize");

import { paginateResult } from '../../../utils/Pagination'

const ForumCategoryModel = require('./model')

module.exports = {
    async list(req){
        const page = parseInt(req.query.page ? req.query.page : 1)
        const pageSize = parseInt(req.query.pageSize ? req.query.pageSize : 10)
        const offset = page * pageSize - pageSize
        const search = null
        const attributes = ["id", "name", "createdAt", "updatedAt"]
        const order = [
            ['createdAt', 'DESC'],
            ['updatedAt', 'DESC']
        ]
        const { count, rows } = await ForumCategoryModel.list(attributes, search, pageSize, offset, order)
        return paginateResult(count.length, page, pageSize, rows)
    }
}