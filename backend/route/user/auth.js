const router = Router()
import { Router } from 'express'
import { HttpUtils } from '../../utils'
import { config } from "../../config/loadConfig"
import { HTTP_ERROR_CODE } from '../../config'
import UserController from '../../service/user/controllerUser'

router.post('/register', (req, res) => {
    UserController.register(req.body).then(() => {
        return HttpUtils.jsonResponse(res)
    }).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.post('/login', (req, res) => {
    UserController.login(res, req.body).then((data) => {
        const { resUpdated, user } = data
        return HttpUtils.jsonResponse(resUpdated, user)
    }).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.post('/forgot-password', (req, res) => {
    UserController.forgotPassword(req.body).then(() => {
        return HttpUtils.jsonResponse(res)
    }).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.post('/resend-registration-email', (req, res) => {
    UserController.resendRegistrationEmail(req.body).then(() => {
        return HttpUtils.jsonResponse(res)
    }).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.post('/logout', (req, res) => {
    res.clearCookie(config.get('cookieAccessToken'))
    return HttpUtils.jsonResponse(res)
})

module.exports = router