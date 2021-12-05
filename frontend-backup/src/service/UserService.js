import { URLUtils } from 'utils'
import { BE_ROUTE } from 'config'
import HttpService from './HttpService'

export default class UserService {
  static sync() {
    const url = URLUtils.buildBeURL(BE_ROUTE.USER.BASE, BE_ROUTE.USER.PATH.SYNC)
    return HttpService.get(url)
  }

  static getUserInfo() {
    const url = URLUtils.buildBeURL(BE_ROUTE.INFORMATION.BASE)
    return HttpService.get(url)
  }

  static getUserProfile(userId) {
    const url = URLUtils.buildBeURL(BE_ROUTE.PROFILE.BASE, `/${userId}`)
    return HttpService.get(url)
  }

  // update user info
  static putUserInfo(data) {
    const url = URLUtils.buildBeURL(BE_ROUTE.INFORMATION.BASE)
    return HttpService.put(url, data)
  }

  // get all uploaded avatar
  static getUserAvatar() {
    const url = URLUtils.buildBeURL(BE_ROUTE.INFORMATION.BASE, `/avatar`)
    return HttpService.get(url)
  }

  // set new avatar
  static setUserAvatar(data) {
    const url = URLUtils.buildBeURL(BE_ROUTE.INFORMATION.BASE, `/avatar`)
    return HttpService.put(url, data)
  }

  // delete selected avatar
  static deleteUserAvatar(data) {
    const url = URLUtils.buildBeURL(BE_ROUTE.INFORMATION.BASE, `/avatar`)
    return HttpService.delete(url, data)
  }

  static changePassword(data) {
    const url = URLUtils.buildBeURL(
      BE_ROUTE.INFORMATION.BASE,
      BE_ROUTE.INFORMATION.PATH.CHANGE_PASSWORD,
    )
    return HttpService.post(url, data)
  }

  static forgotPassword(data) {
    const url = URLUtils.buildBeURL(
      BE_ROUTE.INFORMATION.BASE,
      BE_ROUTE.INFORMATION.PATH.FORGOT_PASSWORD,
    )
    return HttpService.post(url, data)
  }

  // get teams that include this user
  static getTeamInfo() {
    const url = URLUtils.buildBeURL(BE_ROUTE.INFORMATION.BASE, BE_ROUTE.INFORMATION.PATH.TEAM)
    return HttpService.get(url)
  }
}
