/**
 ----- sync between BE & FE -----
 */

export const HTTP_ERROR_CODE = {
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500
}

export const CONST_VALIDATOR = {
  USER_INFO_MIN_LENGTH: 5,
  USER_INFO_MAX_LENGTH: 50,
  NEWS_COMMENT_MIN_LENGTH: 1,
  NEWS_COMMENT_MAX_LENGTH: 500,
}

/**
 ----- sync between BE & FE: End -----
 */


export const ENV_LOCAL = 'local'
export const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const TIME_FORMAT_DATE_ONLY = 'DD/MM/YYYY'
export const DEFAULT_AVT = 'default.png'

export const URL = {
  USER_AVATAR: {
    FOLDER: 'public/avatar',
    PUBLIC: '/api/user/public/avatar'
  },
  NEWS_THUMBNAIL: {
    FOLDER: 'public/news/thumbnail',
    PUBLIC: '/api/user/public/news/thumbnail'
  },
}

export const DATABASE_FOREIGN_KEY = {
  USER_ID: 'userId',
  NEWS_ID: 'newsId',
  NEWS_COMMENT_ID: 'newsCommentId',
  NEWS_COMMENT_PARENT_ID: 'newsCommentParentId',
  CONTEST_ID: 'contestId',
  CREATED_BY: 'createdBy',
  DELETED_BY: 'deletedBy',
  FORUM_ID: 'forumId',
  FORUM_CATEGORY_ID: 'forumCategoryId',
  FORUM_TOPIC_ID: 'forumTopicId',
  FORUM_POST_ID: 'forumPostId',
  FORUM_PARENT_POST_ID: 'forumParentPostId',
  UPDATED_BY: 'updatedBy',
}

// for easy reading in error log, put in the end of every session
export const DELIMITER_MESSAGE_LOG_SESSION = '\n\n\n'

export const USER_STATUS = {
  INACTIVE: 0,
  ACTIVE: 1
}

export const USER_ROLE = {
  USER: 'user',
  POWER_USER: 'power',
  ADMIN: 'admin'
}

export const USER_TITLE = {
  LEADER: 'LEADER',
  MEMBER: 'MEMBER'
}

export const CONTEST_STATUS = {
  PLANNED: 'planned',
  ONGOING: 'ongoing',
  PAST: 'past',
}

export const AUDIT_LOG_FORMAT = {
  ACTION: '[%s] %s %s %s', // filename - action - model - data
}

export const AUDIT_LOG_FORMAT_BIGO_CODER = {
  ACTION: '[%s] %s %s', // filename - action - data
}

export const AUDIT_LOG_ACTION = {
  REGISTER: 'REGISTER',
  UNREGISTER: 'UNREGISTER',
  ACTIVATE: 'ACTIVATE',
  CREATE: 'CREATE',
  ADD: 'ADD',
  LOGIN: 'LOGIN',
  UPDATE: 'UPDATE',
  GET: 'GET',
  DELETE: 'DELETE',
  SEND_MAIL: 'SEND_MAIL',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  RESEND_REGISTRATION_EMAIL: 'RESEND_REGISTRATION_EMAIL',
  RENAME: 'RENAME',
}

export const AUDIT_LOG_STATUS = {
  SUCCESS: 'SUCCESS',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FAILED: 'FAILED',
  INACTIVE: 'INACTIVE',
  INVALID_ACTION: 'INVALID_ACTION',
  INVALID_TOKEN: 'INVALID_TOKEN',
  INVALID_STATUS: 'INVALID_STATUS',
}

export const AUDIT_LOG_MODEL = {
  USER: 'USER',
  REGISTRATION: 'REGISTRATION',
  USER_PROFILE: 'USER_PROFILE',
  USER_WORK_EXPERIENCE: 'USER_WORK_EXPERIENCE',
  USER_EDUCATION: 'USER_EDUCATION',
  NEWS_COMMENT: 'NEWS_COMMENT',
  NEWS_VIEW: 'NEWS_VIEW',
  NEWS_COMMENT_LIKE: 'NEWS_COMMENT_LIKE',
  FORUM: 'FORUM',
  FORUM_CATEGORY: 'FORUM_CATEGORY',
  FORUM_TOPIC: 'FORUM_TOPIC',
  FORUM_POST: 'FORUM_POST',
  CONTEST: 'CONTEST',
  CALENDAR: 'CALENDAR',
  TEAM: 'TEAM',
  TEAM_MEMBER: 'TEAM_MEMBER',
  ALERT_TO_ADMIN: 'ALERT_TO_ADMIN',
}

export const LOCALE = {
  VIETNAMESE: 'vi',
  ENGLISH: 'en'
}


