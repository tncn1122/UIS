import { Op } from 'sequelize'
const Faq = require('../../config/dbMaster')['Faq']

const faqFields = ['question', 'answer', 'locale']

module.exports = {

  async create(data) {
    return Faq.create(data, {
      fields: faqFields
    })
  },

  async update(id, data) {
    return Faq.update(data, {
      where: {
        id,
      },
      fields: faqFields
    })
  },

  async getFaqsByLocale(locale) {
    return Faq.findAll({
      where: locale,
      raw: true,
      order: [['id', 'ASC']]
    })
  },

  async deleteById(id) {
    return Faq.destroy({
      where: {
        id
      },
    })
  }

}