import { HttpUtils } from 'utils'

export default class HttpService {
  static get(url, data) {
    return HttpUtils.makeJsonRequest('GET', url, data)
  }

  static post(url, data) {
    return HttpUtils.makeJsonRequest('POST', url, data)
  }

  static put(url, data) {
    return HttpUtils.makeJsonRequest('PUT', url, data)
  }

  static delete(url, data) {
    return HttpUtils.makeJsonRequest('DELETE', url, data)
  }
}
