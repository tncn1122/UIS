const Forum = require ('../../config/dbMaster')['Forum']

module.exports = {
    async list(fields, search, limit, offset, order){
        const queryOptions = {
            attributes: [
                ...fields
            ],
            where: search,
            limit, offset, order
        }
        return await Forum.findAndCountAll(queryOptions)
    },

    async findOne(forumId, fields){
        const queryOptions = {
            attributes: [...fields]
        }
        return await Forum.findByPk(forumId, queryOptions)
    }
}