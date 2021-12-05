import { URLUtils } from 'utils'
import { BE_ROUTE } from 'config'
import HttpService from './HttpService'

export default class ActivateService {
  static registration(data) {
    const url = URLUtils.buildBeURL(BE_ROUTE.ACTIVATE.BASE, BE_ROUTE.ACTIVATE.PATH.REGISTRATION)
    return HttpService.post(url, data)
  }

  static forgotPassword(data) {
    const url = URLUtils.buildBeURL(BE_ROUTE.ACTIVATE.BASE, BE_ROUTE.ACTIVATE.PATH.FORGOT_PASSWORD)
    return HttpService.post(url, data)
  }
}
