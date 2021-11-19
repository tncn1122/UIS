import queryString from 'querystring'
import Q from 'q'
import axios from 'axios'

export default class HttpUtils {
  static async makeHttpRequest(methodOriginal, url, data, customHeaders) {
    const method = methodOriginal.toLowerCase()
    const config = {
      method,
      url,
      withCredentials: true,
    }
    if (data) {
      const paramsTxt = queryString.stringify(data)
      if (method === 'get' || method === 'delete') config.url = `${url}?${paramsTxt}`
      else if (method === 'post' || method === 'put') config.data = data
    }
    let headers = {
      'Content-type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    }
    if (customHeaders) headers = customHeaders
    config.headers = headers
    const deferred = Q.defer()
    try {
      const resp = await axios(config)
      deferred.resolve(resp.data)
    } catch (err) {
      deferred.reject(err)
    }
    return deferred.promise
  }

  static makeJsonRequest(method, url, data, customHeaders) {
    const headers = {
      'Content-type': 'application/json',
      Accept: 'application/json',
    }
    return this.makeHttpRequest(method, url, data, { ...headers, ...customHeaders })
  }
}
