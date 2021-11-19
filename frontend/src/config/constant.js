import { TEXT_UI_LAYOUT } from './text'
import { FE_ROUTE } from './urls'

/**
 ----- sync between BE & FE -----
 */

export const HTTP_ERROR_CODE = {
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
}

export const CONST_VALIDATOR = {
  USER_INFO_MIN_LENGTH: 5,
  USER_INFO_MAX_LENGTH: 50,
}

/**
 ----- sync between BE & FE: End -----
 */

export const ENV_LOCAL = 'local'
export const TIME_FORMAT = 'YYYY-MM-DD HH:mm'
export const TIME_FORMAT_DATE_ONLY = 'DD/MM/YYYY'
export const TIME_FORMAT_BIRTH_DATE = 'YYYY'
export const TIME_FORMAT_NEWS = 'DD MMM YYYY'
export const DEFAULT_AVT = 'default.png'

export const CONTEST_STATUS = {
  PLANNED: 'planned',
  ONGOING: 'ongoing',
  PAST: 'past',
}

export const APP_MODULES = [
  {
    label: TEXT_UI_LAYOUT.HEADER.CONTEST,
    link: FE_ROUTE.CONTEST.HOME,
  },
  // // todo: will be enabled when release Code Tour platform
  // {
  //   label: TEXT_UI_LAYOUT.HEADER.TRAINING,
  //   link: FE_ROUTE.TRAINING.HOME,
  // },
  {
    label: TEXT_UI_LAYOUT.HEADER.FORUM,
    link: FE_ROUTE.FORUM.HOME,
  },
  {
    label: TEXT_UI_LAYOUT.HEADER.NEWS,
    link: FE_ROUTE.NEWS.HOME,
  },
  {
    label: TEXT_UI_LAYOUT.HEADER.RANKING,
    link: FE_ROUTE.RANKING.HOME,
  },
]

export const CONST_COUNTRY = [
  {
    label: 'Việt Nam',
    key: 'VNM',
    province: [
      {
        label: 'Hồ Chí Minh',
        key: '02',
        district: [
          {
            label: 'Quận 1',
            key: '01',
          },
          {
            label: 'Quận 2',
            key: '02',
          },
        ],
      },
      {
        label: 'Đồng Nai',
        key: '48',
        district: [
          {
            label: 'Biên Hòa',
            key: '01',
          },
          {
            label: 'Thống Nhất',
            key: '02',
          },
        ],
      },
    ],
  },
  {
    label: 'Nhật Bản',
    key: 'JPN',
    province: [
      {
        label: 'Osaka',
        key: '01',
        district: [],
      },
      {
        label: 'Tokyo',
        key: '02',
        district: [],
      },
    ],
  },
]

export const PAGINATION_OPTIONS = {
  NEWS: {
    pageSize: 10,
  },
  FORUM: {
    pageSize: 5,
  },
  FORUM_TOPIC: {
    pageSize: 10,
  },
  FORUM_POST: {
    pageSize: 10,
  },
}
