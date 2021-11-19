import log4js from 'log4js'
const logger = log4js.getLogger()
import { ENV_LOCAL } from '../config'

module.exports = {
  frontendUserEndPoint: process.env.FRONTEND_USER_END_POINT,
  baseEndpointApi:'/api',
  securityTokenLength: 32,
  corsAllowedOrigins: [
      'http://localhost:4001', // frontend
      'http://localhost:5001', // admin
      'https://dev-codetour.engineering.vng.vn',
      'https://staging-codetour.engineering.vng.vn',
      'https://codetour.engineering.vng.vn',
      'https://codetour.vn'
  ],
  cookieAccessToken: 'access-token',
  jwtSecretKey: process.env.JWT_SECRET_KEY || "defaultJWTKey",
  jwtExpiredInterval: '24h',
  cookieAge: {  // format: https://momentjs.com/docs/#/manipulating/add/
      min: '1d',
      max: '30d'
  },
  adminMailingList: process.env.ADMIN_MAILING_LIST.split(','),
  bigOURLTokenPattern: "<token>",
  smtp: {
      pool: true,
      host: process.env.SMTP_SERVER,
      port: parseInt(process.env.SMTP_PORT),
      logger: true,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
      },
      tls: {
          rejectUnauthorized: false
      },
  },
  database: {
      master: {
          dialect: process.env.DB_DIALECT || "postgres",
          // https://sequelize.org/master/manual/getting-started.html#logging
          logging: process.env.NODE_ENV === ENV_LOCAL ? logger.debug.bind(logger) : false,
          host: process.env.DB_HOST || "localhost",
          port: parseInt(process.env.DB_PORT) || 5432,
          database: process.env.DB_NAME || "code-tour",
          username: process.env.DB_USERNAME || "code-tour",
          password: process.env.DB_PASSWORD || "code-tour",
          charset: 'utf8',
          collate: 'utf8_general_ci',
          pool: {
              max: process.env.DB_MAX_CONNECT || 10,
              min: process.env.DB_MIN_CONNECT || 0,
              acquire: process.env.DB_ACQUIRE_TIMEOUT || 30000,
              idle: process.env.DB_IDLE_TIMEOUT || 10000
          },
          define: {
              // underscored: true,
              // freezeTableName: true, //use singular table name
              // timestamps: false,  // I do not want timestamp fields by default
              charset: 'utf8',
              dialectOptions: {
                  collate: 'utf8_general_ci'
              }
          },
          // todo: --- Doesn't work ---
          // dialectOptions: {
          //     useUTC: false, // for reading from database
          //     dateStrings: true,
          //     typeCast: function (field, next) { // for reading from database
          //         if (field.type == 'DATETIME' || field.type == 'TIMESTAMP') {
          //             return DateTimeUtils.formatDate(field.string)
          //         }
          //         return next()
          //     }
          // },
          // timezone: TIMEZONE, // for writing to database
      },
      // 2nd DB
  },



  ZALO_REDIRECT_URL: 'http://localhost:3001/api/v1/zalo/oauth2callback',
  ZALO_AUTH_URL: 'https://oauth.zaloapp.com/v3/permission',
  ZALO_OAUTH_TOKEN_URL: 'https://oauth.zaloapp.com/v3/access_token'
}
