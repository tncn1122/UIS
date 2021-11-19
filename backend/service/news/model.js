
const Sequelize = require('sequelize')

const News = require('../../config/dbMaster')['News']
const NewsLike = require('../../config/dbMaster')['NewsLike']
const NewsComment = require('../../config/dbMaster')['NewsComment']
const NewsView = require('../../config/dbMaster')['NewsView']


module.exports = {
  getNewsAdditionalAttributes() {
    return [
      [Sequelize.literal(`(SELECT COUNT(*) FROM "news_comment" WHERE "news_comment"."newsId"="News".id)`), 'countComments'],
      [Sequelize.literal(`(SELECT COUNT(*) FROM "news_view" WHERE "news_view"."newsId"="News".id)`), 'countViews']
    ]
  },

  getNewsAdditionalModels() {
    return [
      { model: NewsComment, attributes: [], as: "newsComments" },
      { model: NewsView, attributes: [], as: "newsViews" },
    ]
  },

  async list(attributes, search, limit, offset, order) {
    const queryOptions = {
      attributes: [
        ...attributes,
        ...this.getNewsAdditionalAttributes()
      ],
      limit, offset, order,
      where: search,
      include: this.getNewsAdditionalModels(),
      group: ['News.id'],
      subQuery: false
    }
    return await News.findAndCountAll(queryOptions)
  },

  async getById(newsId) {
    const queryOptions = {
      attributes: {
        include: this.getNewsAdditionalAttributes()
      },
      include: this.getNewsAdditionalModels(),
      group: ['News.id'],
    }

    return await News.findByPk(newsId, queryOptions)
  },

  async create(data) {
    return await News.create(data, { fields: ['title', 'htmlContent', 'summary', 'thumbnailURL', 'createdBy'] })
  },

  async update(id, data) {
    return News.update(data, { where: { id } })
  },

  async delete(id, data) {
    return News.update(data, { where: { id } })
  },
}