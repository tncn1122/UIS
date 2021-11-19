import { URLUtils } from 'utils'
import { BE_ROUTE } from 'config'
import HttpService from './HttpService'

export default class ForumService {
  static getCategories(search) {
    const url = URLUtils.buildBeURL(BE_ROUTE.FORUM.BASE, BE_ROUTE.FORUM.PATH.CATEGORIES)
    return HttpService.get(url, search)
  }

  static getForumDetails(forumId) {
    const url = URLUtils.buildBeURL(BE_ROUTE.FORUM.BASE, `${BE_ROUTE.FORUM.PATH.FORUMS}/${forumId}`)
    return HttpService.get(url)
  }

  static getTopicDetails(topicId) {
    const url = URLUtils.buildBeURL(BE_ROUTE.FORUM.BASE, `${BE_ROUTE.FORUM.PATH.TOPICS}/${topicId}`)
    return HttpService.get(url)
  }

  static getTopicsByForum(search, forumId) {
    const url = URLUtils.buildBeURL(
      BE_ROUTE.FORUM.BASE,
      `${BE_ROUTE.FORUM.PATH.FORUMS}/${forumId}${BE_ROUTE.FORUM.PATH.TOPICS}`,
    )
    return HttpService.get(url, search)
  }

  static getPostsByTopic(search, topicId) {
    const url = URLUtils.buildBeURL(
      BE_ROUTE.FORUM.BASE,
      `${BE_ROUTE.FORUM.PATH.TOPICS}/${topicId}${BE_ROUTE.FORUM.PATH.POSTS}`,
    )
    return HttpService.get(url, search)
  }

  static postPost(topicId, data) {
    const url = URLUtils.buildBeURL(
      BE_ROUTE.FORUM.BASE,
      `${BE_ROUTE.FORUM.PATH.TOPICS}/${topicId}${BE_ROUTE.FORUM.PATH.POSTS}`,
    )
    return HttpService.post(url, data)
  }

  static createTopic(forumId, data) {
    const url = URLUtils.buildBeURL(
      BE_ROUTE.FORUM.BASE,
      `${BE_ROUTE.FORUM.PATH.FORUMS}/${forumId}${BE_ROUTE.FORUM.PATH.TOPICS}`,
    )
    return HttpService.post(url, data)
  }

  static postTopicView(topicId) {
    const url = URLUtils.buildBeURL(
      BE_ROUTE.FORUM.BASE,
      `${BE_ROUTE.FORUM.PATH.TOPICS}/${topicId}/views`,
    )
    return HttpService.post(url)
  }

  static postPostLike(postId) {
    const url = URLUtils.buildBeURL(
      BE_ROUTE.FORUM.BASE,
      `${BE_ROUTE.FORUM.PATH.POSTS}/${postId}/likes`,
    )
    return HttpService.post(url, { isLike: true })
  }

  static postPostDislike(postId) {
    const url = URLUtils.buildBeURL(
      BE_ROUTE.FORUM.BASE,
      `${BE_ROUTE.FORUM.PATH.POSTS}/${postId}/likes`,
    )
    return HttpService.post(url, { isLike: false })
  }

  static deletePostLikeDislike(postId) {
    const url = URLUtils.buildBeURL(
      BE_ROUTE.FORUM.BASE,
      `${BE_ROUTE.FORUM.PATH.POSTS}/${postId}/likes`,
    )
    return HttpService.delete(url)
  }
}
