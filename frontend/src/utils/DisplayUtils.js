import _ from 'lodash'
import { notification } from 'antd'
import { TEXT_NOTIFICATION_ERROR } from '../config'
import MiscUtils from './MiscUtils'

export default class DisplayUtils {
  static showNotification(message, description, setting) {
    notification.success({ message, description, placement: 'topRight', ...setting })
  }

  static showNotificationError(message, description, setting) {
    // in Case 3 of ErrorHandlerUtils.js
    // if "Network error" (when BE stopped) then we need to slugify and map to the other message
    notification.error({
      message: _.get(TEXT_NOTIFICATION_ERROR, MiscUtils.slugify(message), message),
      description,
      placement: 'topRight',
      ...setting,
    })
  }
}
