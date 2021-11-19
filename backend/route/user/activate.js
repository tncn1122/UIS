const router = Router()
import { Router } from 'express'
import { HttpUtils } from '../../utils'
import { HTTP_ERROR_CODE } from '../../config'
import ActivateController from '../../service/activate/controllerActivate'

router.post('/registration', (req, res) => {
    ActivateController.registration(req.body).then(() => {
        return HttpUtils.jsonResponse(res)
    }).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.post('/forgot-password', (req, res) => {
    ActivateController.forgotPassword(req.body).then(() => {
        return HttpUtils.jsonResponse(res)
    }).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

module.exports = router