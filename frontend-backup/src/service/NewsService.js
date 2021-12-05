import { URLUtils } from 'utils'
import { BE_ROUTE } from 'config'
import HttpService from './HttpService'

export default class NewsService {
  static getNews(search) {
    const url = URLUtils.buildBeURL(BE_ROUTE.NEWS.BASE, null)
    return HttpService.get(url, search)
  }

  static getNewsDetails(newsId) {
    const url = URLUtils.buildBeURL(BE_ROUTE.NEWS.BASE, `/${newsId}`)
    return HttpService.get(url)
  }

  static getComments(newsId, search) {
    const url = URLUtils.buildBeURL(BE_ROUTE.NEWS.BASE, `/${newsId}/comments`)
    return HttpService.get(url, search)
  }

  static postComment(newsId, data) {
    const url = URLUtils.buildBeURL(BE_ROUTE.NEWS.BASE, `/${newsId}/comments`)
    return HttpService.post(url, data)
  }

  static postCommentReply(newsId, commentId, data) {
    const url = URLUtils.buildBeURL(BE_ROUTE.NEWS.BASE, `/${newsId}/comments/${commentId}`)
    return HttpService.post(url, data)
  }

  static postCommentLike(newsId, commentId) {
    const url = URLUtils.buildBeURL(BE_ROUTE.NEWS.BASE, `/${newsId}/comments/${commentId}/likes`)
    return HttpService.post(url)
  }

  static deleteCommentLike(newsId, commentId) {
    const url = URLUtils.buildBeURL(BE_ROUTE.NEWS.BASE, `/${newsId}/comments/${commentId}/likes`)
    return HttpService.delete(url)
  }

  static postCommentView(newsId) {
    const url = URLUtils.buildBeURL(BE_ROUTE.NEWS.BASE, `/${newsId}/views`)
    return HttpService.post(url)
  }
}
