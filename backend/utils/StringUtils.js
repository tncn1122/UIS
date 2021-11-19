import _ from 'lodash'

export default class StringUtils {

  static trim(txt, char){
    return _.trim(txt, char)
  }

}
