import _ from 'lodash'
import passport from 'passport'
import { Strategy } from 'passport-jwt'
import { config } from '../config/loadConfig'
import UserModel from '../service/user/modelUser'
import { AUDIT_LOG_ACTION } from "./constant";

// MUST use module.exports
module.exports = () => {
    const cookieExtractor = (req) => {
        let accessToken = null;
        if (req && req.cookies)
            accessToken = _.get(req.cookies, config.get('cookieAccessToken'), null)
        return accessToken;
    };

    const jwtOptions = {
        secretOrKey: config.get('jwtSecretKey'),
        jwtFromRequest: cookieExtractor
    }

    passport.use(new Strategy(jwtOptions, async (jwt_payload, next) => {
        if (jwt_payload.action !== AUDIT_LOG_ACTION.LOGIN)
            return next(null, false)
        const user = await UserModel.getByUserId(jwt_payload.userId)
        if (user)
            return next(null, user)
        else
            return next(null, false)
    }))
}