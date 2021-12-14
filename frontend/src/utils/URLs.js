import qs from 'qs'
import { API_URL } from '../config'

export default class URLUtils {
  static buildBeURL(base, pathname) {
    const baseUrl = `${API_URL}${base}`
    return pathname ? baseUrl + pathname : baseUrl
  }

  static buildAvatarURL(avatar = 'default.png') {
    return `${API_URL}/${avatar}`
  }

  static buildThumbnailURL(thumbnail = 'default.png') {
    return `${API_URL}/${thumbnail}`
  }

  static moveToURL(url) {
    window.location.href = url
  }

  static reloadPage() {
    window.location.reload(true)
    // If we needed to pull the document from
    //  the web-server again (such as where the document contents
    //  change dynamically) we would pass the argument as 'true'.
  }

  static routeToPage(history, url) {
    history.push(url)
  }

  static getParamsInURL() {
    return qs.parse(window.location.search, { ignoreQueryPrefix: true })
  }

  static getPathnameInURL() {
    return window.location.pathname
  }
}
