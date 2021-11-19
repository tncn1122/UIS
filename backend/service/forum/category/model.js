const Sequelize = require('sequelize')
const { Op } = Sequelize;

const Forum = require ('../../../config/dbMaster')['Forum']
const ForumCategory = require('../../../config/dbMaster')['ForumCategory']
const ForumTopic = require ('../../../config/dbMaster')['ForumTopic']
const ForumPost = require ('../../../config/dbMaster')['ForumPost']

module.exports = {
    async list(fields, search, limit, offset, order){
        /** MORE ATTRIBUTES
         *  Forum: list all, num of topics, num of replies, recent replies
         *  recent replies: title, last update
         */

        
        const sqlCountForumTopics = `(SELECT COUNT(*) FROM "forum_topic" WHERE "forum_topic"."forumId" = "forums"."id")`

        const sqlCountForumPosts = `(select SUM(count_posts::int) from (
                select forums.id as forum_id, forum_topic.id as topic_id, COUNT(*) as count_posts 
                from forum_topic
                    left join forum_post on "forum_topic"."id" = "forum_post"."forumTopicId"
                    group by "forum_topic"."id", "forums"."id"
                    having "forums"."id" = "forum_topic"."forumId") as "forums.countTopicPosts")`
        
        const modelPostInclude = {
            model: ForumPost,
            as: 'forumPosts',
            attributes: []
        }

        const modelTopicInclude = {
            model: ForumTopic,
            as: 'forumTopics',
            attributes: [],
            include: [modelPostInclude]
        }
        
        const modelLatestTopicInclude = {
            model: ForumTopic,
            as: 'forumTopics',
            attributes: ['title', 'updatedAt'],
            limit: 1,
            order: [
                ["updatedAt", "DESC"]
            ]
        }

        const modelForumInclude = {
            model: Forum,
            as: 'forums',
            attributes: ['id', 'name',
                [Sequelize.literal(sqlCountForumTopics), "countTopics"],
                [Sequelize.literal(sqlCountForumPosts), "countPosts"]
            ],
            include: [modelTopicInclude, modelLatestTopicInclude]
        }
        const queryOptions = {
            attributes: [
                ...fields
            ],
            where: {
                ...search
            },
            include: [modelForumInclude],
            limit, offset, order,
            group: ["ForumCategory.id"]
        }
        return await ForumCategory.findAndCountAll(queryOptions)
    }
}



