const { create } = require("lodash");

const ForumTopicView = require('../../../../config/dbMaster')['ForumTopicView']


module.exports = {
    async create(data){
        return await ForumTopicView.create(data)
    }
}