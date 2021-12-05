import { URLUtils } from 'utils'
import { BE_ROUTE } from 'config'
import HttpService from './HttpService'

export default class FaqService {
  static getFaqs(locale) {
    const url = URLUtils.buildBeURL(BE_ROUTE.FAQ.BASE)
    return HttpService.get(url, { locale })
  }
}
