import _ from 'lodash'
import axios from 'axios'
import Q from 'q'
import { DELIMITER_MESSAGE_LOG_SESSION, TEXT_NOTIFICATION_ERROR } from "../config"
import ErrorHandlerUtils from './ErrorHandlerUtils'
import MiscUtils from './MiscUtils'
import ValidationUtils from './ValidationUtils'
import queryString from "querystring";

const currentFileName = require('path').basename(__filename)

export default class HttpUtils {
  static async makeHttpRequest(methodOriginal, url, data, customHeaders) {
    const method = methodOriginal.toLowerCase()
    const config = {
      method,
      url
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

  static errorResponse(res, error, httpCode){
    let errorMessage = ErrorHandlerUtils.extractErrorMessage(error)
    if (!ValidationUtils.isString(errorMessage))
      try {
        errorMessage = JSON.parse(errorMessage)
      } catch (error) {
        // happen when we want to return a single error message by "throw new Error("")
        console.log(error);
      }
    res.status(httpCode)
    return res.json({
      error: _.get(TEXT_NOTIFICATION_ERROR, MiscUtils.slugify(errorMessage), errorMessage)
    })
  }

  static jsonResponse(res, data) {
    return ValidationUtils.empty(data) ? res.json({status: "success"}) : res.json(data)
  }

}
