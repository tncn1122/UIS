export const FE_ROUTE = {
  ACTIVATE: {
    REGISTRATION: '/activate/registration',
    FORGOT_PASSWORD: '/activate/forgot',
  },
}

export const BIGO_CODER_ROUTE = {
  BASE: '/api/sgct',
  PATH: {
    REGISTER_USER: '/sign-up',
    LOGIN_USER: '/sign-in',
    REGISTER_USER_TO_CONTEST: '/contest/:id/register',
    UNREGISTER_USER_FROM_CONTEST: '/contest/:id/unregister',
    CONTEST_REPORT: '/contest/:id/detailreport',
    CONTEST_REGISTRANT: '/contest/:id/contestants'
  }
}
