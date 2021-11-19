export const FE_ROUTE = {
  DEFAULT_ROUTE: '/',
  ERROR: {
    FORBIDDEN: '/error/forbidden',
    FORBIDDEN_LOGOUT: '/error/forbidden-logout',
  },
  AUTH: {
    ROOT: '/auth',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
  },
  ACTIVATE: {
    ROOT: '/activate',
    REGISTRATION: '/activate/registration',
    FORGOT_PASSWORD: '/activate/forgot',
  },

  CONTEST: {
    HOME: '/contest',
    PUBLIC: '/contest/public',
    PRIVATE: '/contest/private',
  },
  TRAINING: {
    HOME: '/training',
  },
  NEWS: {
    HOME: '/news',
  },
  FORUM: {
    HOME: '/forums',
  },
  RANKING: {
    HOME: '/ranking',
  },

  USER: {
    INFORMATION: '/user/information',
    PROFILE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
    TEAM_MANAGEMENT: '/user/team-management',
  },
  MISC: {
    ABOUT_US: '/about-us',
    TOS: '/terms',
    FAQ: '/faqs',
    VNG_CHANNEL: {
      FACEBOOK: 'https://www.facebook.com/VNGCorporation.Page',
      INSTAGRAM: 'https://www.instagram.com/life_at_vng',
      LINKEDIN: 'https://www.linkedin.com/company/vng-corporation/mycompany',
      YOUTUBE: 'https://www.youtube.com/channel/UCwyo2uR5GNjGnhAyypuHHMQ',
    },
  },
}

export const BE_ROUTE = {
  AUTH: {
    BASE: '/auth',
    PATH: {
      REGISTER: '/register',
      LOGIN: '/login',
      FORGOT_PASSWORD: '/forgot-password',
      LOGOUT: '/logout',
      RESEND_REGISTRATION_EMAIL: '/resend-registration-email',
    },
  },
  ACTIVATE: {
    BASE: '/activate',
    PATH: {
      REGISTRATION: '/registration',
      FORGOT_PASSWORD: '/forgot-password',
    },
  },
  USER: {
    BASE: '/user',
    PATH: {
      SYNC: '/sync',
    },
  },
  CONTEST: {
    BASE: '/contest',
    PATH: {
      GET: '/get',
      PUBLIC: '/public',
      ADD_TO_CALENDAR: '/add-to-calendar',
      REGISTER: '/register',
      VISIT_ROOM: '/visit-room',
      PRIVATE: '/private',
    },
  },
  INFORMATION: {
    BASE: '/information',
    PATH: {
      CHANGE_PASSWORD: '/change-password',
      FORGOT_PASSWORD: '/forgot-password',
      AVATAR: '/avatar',
      PUBLIC_AVATAR: '/public/avatar',
      TEAM: '/team',
    },
  },
  PROFILE: {
    BASE: '/profile',
    PATH: {
      AVATAR: '/avatar',
      PUBLIC_AVATAR: '/public/avatar',
    },
  },
  NEWS: {
    BASE: '/news',
    PATH: {
      LIKE: '/likes',
      COMMENT: '/comments',
      VIEW: '/views',
      THUMBNAIL: '/thumbnail',
    },
  },
  TEAM: {
    BASE: '/team',
    PATH: {
      CREATE: '/create',
      DELETE: '/delete',
      ADD_MEMBER: '/add-member',
      DELETE_MEMBER: '/delete-member',
      RENAME: '/rename',
    },
  },
  FORUM: {
    BASE: '/forum',
    PATH: {
      CATEGORIES: '/categories',
      TOPICS: '/topics',
      POSTS: '/posts',
      FORUMS: '/forums',
    },
  },
  FAQ: {
    BASE: '/faq',
  },
}
