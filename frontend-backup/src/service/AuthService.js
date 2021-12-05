import { URLUtils } from 'utils'
import { BE_ROUTE } from 'config'
import HttpService from './HttpService'

export default class AuthService {
  static register(data) {
    const url = URLUtils.buildBeURL(BE_ROUTE.AUTH.BASE, BE_ROUTE.AUTH.PATH.REGISTER)
    return HttpService.post(url, data)
  }

  static login(data) {
    const url = URLUtils.buildBeURL(BE_ROUTE.AUTH.BASE, BE_ROUTE.AUTH.PATH.LOGIN)
    return HttpService.post(url, data)
  }

  static logout() {
    const url = URLUtils.buildBeURL(BE_ROUTE.AUTH.BASE, BE_ROUTE.AUTH.PATH.LOGOUT)
    return HttpService.post(url)
  }

  static forgotPassword(data) {
    const url = URLUtils.buildBeURL(BE_ROUTE.AUTH.BASE, BE_ROUTE.AUTH.PATH.FORGOT_PASSWORD)
    return HttpService.post(url, data)
  }

  static resendRegistrationEmail(data) {
    const url = URLUtils.buildBeURL(
      BE_ROUTE.AUTH.BASE,
      BE_ROUTE.AUTH.PATH.RESEND_REGISTRATION_EMAIL,
    )
    return HttpService.post(url, data)
  }
}
