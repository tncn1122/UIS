import { URLUtils } from 'utils'
import { BE_ROUTE } from 'config'
import HttpService from './HttpService'

export default class ContestService {
  static getById(id) {
    const url = URLUtils.buildBeURL(BE_ROUTE.CONTEST.BASE, `${BE_ROUTE.CONTEST.PATH.GET}/${id}`)
    return HttpService.get(url)
  }

  static getPublic() {
    const url = URLUtils.buildBeURL(BE_ROUTE.CONTEST.BASE, BE_ROUTE.CONTEST.PATH.PUBLIC)
    return HttpService.get(url)
  }

  static addToCalendar(data) {
    const url = URLUtils.buildBeURL(BE_ROUTE.CONTEST.BASE, BE_ROUTE.CONTEST.PATH.ADD_TO_CALENDAR)
    return HttpService.post(url, data)
  }

  static register(data) {
    const url = URLUtils.buildBeURL(BE_ROUTE.CONTEST.BASE, BE_ROUTE.CONTEST.PATH.REGISTER)
    return HttpService.post(url, data)
  }

  static visitRoom(data) {
    const url = URLUtils.buildBeURL(BE_ROUTE.CONTEST.BASE, BE_ROUTE.CONTEST.PATH.VISIT_ROOM)
    return HttpService.post(url, data)
  }
}
