const Sequelize = require('sequelize')

const ForumTopic = require ('../../../config/dbMaster')['ForumTopic']
const User = require('../../../config/dbMaster')['User']
const UserProfile = require('../../../config/dbMaster')['UserProfile']

module.exports = {
    async list(fields, search, limit, offset, order){

        const sqlCountViews = `(SELECT COUNT(*) FROM "forum_topic_view" WHERE "forum_topic_view"."forumTopicId"="ForumTopic".id)`
        const sqlCountPosts = `(SELECT COUNT(*) FROM "forum_post" WHERE "forum_post"."forumTopicId"="ForumTopic".id)`

        const userProfileModelInclude = {
            model: UserProfile,
            attributes: ['avatar'],
            as: 'userProfile'
        }

        const userModelInclude = {
            model: User,
            attributes: ['username'],
            as: 'user',
            include: [userProfileModelInclude]
        }

        const queryOptions = {
            attributes: [
                ...fields,
                [Sequelize.literal(sqlCountViews), "countViews"],
                [Sequelize.literal(sqlCountPosts), "countPosts"]
            ],
            include: [
                userModelInclude,
            ],
            where: search,
            limit, offset, order,
            group: ['ForumTopic.id', "user.id", "user->userProfile.id"]
        }
        return await ForumTopic.findAndCountAll(queryOptions)
    },

    async create(data){
        return await ForumTopic.create(data, {fields: ['title', 'summary', 'createdBy', 'forumId']})
    },

    async findOne(topicId, fields){
        const queryOptions = {
            attributes: [...fields]
        }
        return await ForumTopic.findByPk(topicId, queryOptions)
    }
}