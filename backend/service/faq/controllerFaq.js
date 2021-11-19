const FaqModel = require('./modelFaq')
import { LoggerUtils, ValidationUtils } from '../../utils'
import {
  AUDIT_LOG_ACTION,
  AUDIT_LOG_FORMAT,
  AUDIT_LOG_STATUS
} from '../../config'

const currentFileName = require('path').basename(__filename)

module.exports = {
  async getFaqs(data) {
    const { locale, id } = data
    const query = locale ? { locale } : {}
    if(id){
      query.id = id
    }
    const faqs = await FaqModel.getFaqsByLocale(query)
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.GET, AUDIT_LOG_STATUS.SUCCESS, { locale })
    return { faqs }
  },

  async createFaq(data) {
    const faq = await FaqModel.create(data)
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.POST, AUDIT_LOG_STATUS.SUCCESS, { locale })
    return { faq }
  },

  async updateFaq(data) {
    const faq = await FaqModel.update(data.id, data)
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.POST, AUDIT_LOG_STATUS.SUCCESS, { locale })
    return { faq }
  },

  async deleteFaq(data) {
    const { id } = data
    const faq = await FaqModel.deleteById(id)
    LoggerUtils.infoAction(AUDIT_LOG_FORMAT.ACTION, currentFileName, AUDIT_LOG_ACTION.POST, AUDIT_LOG_STATUS.SUCCESS, { locale })
    return { faq }
  }
}