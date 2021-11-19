import slugify from 'slugify'

export default class MiscUtils {

  static slugify(text) {
    return slugify(text.toLowerCase())
  }

}
