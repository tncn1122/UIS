const ForumPostLikeDislike = require('../../../../config/dbMaster')['ForumPostLikeDislike']

module.exports = {
    async create(data){
        return await ForumPostLikeDislike.create(data)
    },

    async update(data, condition){
        return await ForumPostLikeDislike.update(data, {where: condition})
    },

    async delete(condition){
        return await ForumPostLikeDislike.destroy({where:condition})
    },

    async fineOne(condition){
        return await ForumPostLikeDislike.findOne({where: condition})
    }
}