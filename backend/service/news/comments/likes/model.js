const { create, cond } = require("lodash");

const NewsCommentLike = require('../../../../config/dbMaster')['NewsCommentLike']


module.exports = {
    async create(data){
        return await NewsCommentLike.create(data)
    },

    async delete(condition){
        return await NewsCommentLike.destroy({where:condition})
    }
}