const Sequelize = require('sequelize')
const { Op } = Sequelize;

const ForumPost = require ('../../../config/dbMaster')['ForumPost']
const User = require('../../../config/dbMaster')['User']
const UserProfile = require('../../../config/dbMaster')['UserProfile']
const ForumPostLikeDislike = require('../../../config/dbMaster')['ForumPostLikeDislike']

module.exports = {
    async list(fields, search, limit, offset, order, userId){

        const subQueryCountCommentsLikes = `(SELECT COUNT(*) FROM "forum_post_like_dislike" WHERE "forum_post_like_dislike"."forumPostId"="ForumPost"."id" AND "forum_post_like_dislike"."isLike" = TRUE)`
        const subQueryCountCommentsDislikes = `(SELECT COUNT(*) FROM "forum_post_like_dislike" WHERE "forum_post_like_dislike"."forumPostId"="ForumPost"."id" AND "forum_post_like_dislike"."isLike" = FALSE)`
        const subQueryCheckCommentIsLiked = userId ? `CASE(MAX(CASE WHEN "forumPostLikeDislikes"."userId" ='${userId}' AND "forumPostLikeDislikes"."isLike" = TRUE THEN 1 ELSE 0 END)) WHEN 1 THEN True ELSE False END` : 'FALSE'
        const subQueryCheckCommentIsDisliked = userId ? `CASE(MAX(CASE WHEN "forumPostLikeDislikes"."userId" ='${userId}' AND "forumPostLikeDislikes"."isLike" = FALSE THEN 1 ELSE 0 END)) WHEN 1 THEN True ELSE False END`: 'FALSE'
        const subQueryCountUserPosts = `(SELECT COUNT(*) FROM "forum_post" WHERE "forum_post"."createdBy" = "user"."id")`

        const userProfileModelInclude = {
            model: UserProfile,
            attributes: ['avatar', 'full_name'],
            as: 'userProfile'
        }

        const userModelInclude = {
            model: User,
            attributes: ['username',
                [Sequelize.literal(subQueryCountUserPosts), "countPosts"]
            ],
            as: 'user',
            include: [userProfileModelInclude]
        }

        const ForumPostLikeDislikeInclude = {
            model: ForumPostLikeDislike,
            attributes: [],
            as: 'forumPostLikeDislikes'
        }

        const queryOptions = {
            attributes: {
                ...fields,
                include:[
                    [Sequelize.literal(subQueryCountCommentsLikes), "countLikes"],
                    [Sequelize.literal(subQueryCountCommentsDislikes), "countDislikes"],
                    [Sequelize.literal(subQueryCheckCommentIsLiked), 'isLiked'],
                    [Sequelize.literal(subQueryCheckCommentIsDisliked), 'isDisliked']
                ]
            },
            include: [userModelInclude, ForumPostLikeDislikeInclude],
            where: search,
            limit, offset, order,
            group: ["ForumPost.id", "user.id", "user->userProfile.id"],
            subQuery: false
        }
        return await ForumPost.findAndCountAll(queryOptions)
    },

    async create(data){
        return await ForumPost.create(data, {fields: ['htmlContent', 'createdBy', 'forumTopicId']})
    }
}