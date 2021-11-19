import moment from 'moment'
import { TIME_FORMAT } from 'config'

export default class DateTimeUtils {
  static now() {
    return moment()
  }

  static formatDate(timeObject, format = TIME_FORMAT) {
    return timeObject ? moment(timeObject).format(format) : null
  }

  // usage: DateTimeUtils.addToDate(user.createdAt, config.get('jwtExpiredInterval')) < DatetimeUtils.now()
  static addToDate(dateObj, interval) {
    let type = 'h'
    if (interval.includes('m'))
      // minute
      type = 'm'
    else if (interval.includes('d')) type = 'd'
    else if (interval.includes('M'))
      // month
      type = 'M'
    else if (interval.includes('y')) type = 'y'
    // parseInt(24h) --> 24
    return moment().add(parseInt(interval, 10), type).toDate()
  }

  static toMiliseconds(obj) {
    return moment(obj).valueOf()
  }

  static textToDate(txt) {
    return moment(txt)
  }
}
