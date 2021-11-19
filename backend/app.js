global.ROOT = __dirname
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import express from 'express'
import { loadConf, config } from './config/loadConfig'
import { ErrorHandlerMiddleware } from './middleware'

const app = express()

app.use(helmet())


app.use(express.json({ limit: '800mb' }))
app.use(express.urlencoded({ extended: true, limit: '800mb' }))
app.use(cookieParser());

// init base configurations
loadConf().then(async() => {
    //use cors middleware to avoid error CROSS DOMAIN
    // https://www.npmjs.com/package/cors
    const corsOptions = {
        origin: config.get('corsAllowedOrigins'), // true if want to allow all (*)
        method: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE' ],
        credentials: true,
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    app.use(cors(corsOptions))

    // ----- MUST use require in here -----
    //init db: must be in here, after loadConf()
    await require('./config/dbMaster').connection.sync()
    // apply jwt authentication by passport-jwt
    require('./config/passportJWT')()

    // load route
    app.use(config.get('baseEndpointApi'), require('./route'))

    // handle unexpected exception
    app.use(ErrorHandlerMiddleware)
})

module.exports = app;
