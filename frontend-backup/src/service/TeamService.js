import { URLUtils } from 'utils'
import { BE_ROUTE } from 'config'
import HttpService from './HttpService'

export default class TeamService {
  // create a team
  static createTeam(data) {
    const url = URLUtils.buildBeURL(BE_ROUTE.TEAM.BASE, BE_ROUTE.TEAM.PATH.CREATE)
    return HttpService.post(url, data)
  }

  static deleteTeam(teamId) {
    const url = URLUtils.buildBeURL(BE_ROUTE.TEAM.BASE, `/${teamId}${BE_ROUTE.TEAM.PATH.DELETE}`)
    return HttpService.put(url)
  }

  static addMember(teamId, data) {
    const url = URLUtils.buildBeURL(
      BE_ROUTE.TEAM.BASE,
      `/${teamId}${BE_ROUTE.TEAM.PATH.ADD_MEMBER}`,
    )
    return HttpService.post(url, data)
  }

  static deleteMember(memberId, teamId) {
    const url = URLUtils.buildBeURL(
      BE_ROUTE.TEAM.BASE,
      `/${teamId}${BE_ROUTE.TEAM.PATH.DELETE_MEMBER}/${memberId}`,
    )
    return HttpService.delete(url)
  }

  static rename(teamId, data) {
    const url = URLUtils.buildBeURL(BE_ROUTE.TEAM.BASE, `/${teamId}${BE_ROUTE.TEAM.PATH.RENAME}`)
    return HttpService.put(url, data)
  }
}
