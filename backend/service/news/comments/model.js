const Sequelize = require('sequelize')
const { Op } = Sequelize;

const User = require('../../../config/dbMaster')['User']
const UserProfile = require('../../../config/dbMaster')['UserProfile']
const NewsComment = require('../../../config/dbMaster')['NewsComment']
const NewsCommentLike = require('../../../config/dbMaster')['NewsCommentLike']
const News = require('../../../config/dbMaster')['News']

import { DATABASE_FOREIGN_KEY } from '../../../config'

module.exports = {
    async list(fields, search, limit, offset, order, userId){
        const subQueryCountCommentsLikes = `(SELECT COUNT(*) FROM "news_comment_like" WHERE "news_comment_like"."newsCommentId"="NewsComment"."id")`
        const subQueryCheckCommentIsLiked = `CASE(MAX(CASE "newsCommentLikes"."userId" WHEN '${userId}' THEN 1 ELSE 0 END)) WHEN 1 THEN True ELSE False END`

        const subQueryCountRepliesLikes = `(SELECT COUNT(*) FROM "news_comment_like" WHERE "news_comment_like"."newsCommentId"="replies"."id")`
        const subQueryCheckReplyIsLiked  = `CASE(MAX(CASE "replies->newsCommentLikes"."userId" WHEN '${userId}' THEN 1 ELSE 0 END)) WHEN 1 THEN True ELSE False END`

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

        const newsModelInclude = {
            model: News,
            attributes: [],
            as: 'news'
        }

        const newsCommentLikeModelInclude = {
            model: NewsCommentLike,
            attributes: [],
            as: 'newsCommentLikes',
        }

        const repliesModelInclude = {
            model: NewsComment,
            attributes: {
                ...fields,
                include: [
                    [Sequelize.literal(subQueryCountRepliesLikes), "countLikes"],
                    [Sequelize.literal(subQueryCheckReplyIsLiked), 'isLiked']
                ]
            },
            as: 'replies',
            include: [{
                model: User,
                attributes: ['username'],
                as: 'user',
                include: [{
                    model: UserProfile,
                    attributes: ['avatar'],
                    as: 'userProfile'
                }]
            },
            {
                model: NewsCommentLike,
                attributes: [],
                as: 'newsCommentLikes'
            }
        ],
        }

        const queryOptions = {
            attributes: {
                ...fields,
                include:[
                    [Sequelize.literal(subQueryCountCommentsLikes), "countLikes"],
                    [Sequelize.literal(subQueryCheckCommentIsLiked), 'isLiked']
                ]
            },
            where: {
                ...search,
                [DATABASE_FOREIGN_KEY.NEWS_COMMENT_PARENT_ID] : null
            },
            limit, offset, order,
            include: [
                userModelInclude,
                newsModelInclude,
                repliesModelInclude,
                newsCommentLikeModelInclude,
            ],
            group: ['NewsComment.id', "user.id", "user->userProfile.id", "replies.id", "replies->user.id", "replies->user->userProfile.id"],
            subQuery: false
        }
        return await NewsComment.findAndCountAll(queryOptions)
    },

    async create(data){
        return await NewsComment.create(data, {fields: ['text', 'userId', 'newsId', 'newsCommentParentId']})
    }
}