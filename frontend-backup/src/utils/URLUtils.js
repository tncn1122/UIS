import qs from 'qs'

export default class URLUtils {
  static buildBeURL(base, pathname) {
    const baseUrl = `${process.env.REACT_APP_BACKEND_USER_END_POINT}${base}`
    return pathname ? baseUrl + pathname : baseUrl
  }

  static buildAvatarURL(avatar = 'default.png') {
    return `${process.env.REACT_APP_BACKEND_USER_AVATAR_END_POINT}/${avatar}`
  }

  static buildThumbnailURL(thumbnail = 'default.png') {
    return `${process.env.REACT_APP_BACKEND_NEWS_THUMBNAIL_END_POINT}/${thumbnail}`
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
