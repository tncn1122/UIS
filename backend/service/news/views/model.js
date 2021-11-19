const { create } = require("lodash");

const NewsView = require('../../../config/dbMaster')['NewsView']


module.exports = {
    async create(data){
        return await NewsView.create(data)
    }
}