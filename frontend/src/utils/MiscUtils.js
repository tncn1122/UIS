import { notification } from 'antd'
import shortid from 'shortid'
import slugify from 'slugify'
import { store } from 'redux/store'

export default class MiscUtils {
  static generateId() {
    return shortid.generate()
  }

  static slugify(text) {
    return slugify(text.toLowerCase())
  }

  static showComingSoon(desc) {
    notification.warning({
      message: 'Coming soon!',
      description: desc || 'We are on it now :)',
      placement: 'bottomRight',
    })
  }

  static dispatchReduxAction(func) {
    store.dispatch(func)
  }
}
