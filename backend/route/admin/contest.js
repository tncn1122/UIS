const router = Router()
import { Router } from 'express'
import { HttpUtils } from '../../utils'
import { HTTP_ERROR_CODE } from '../../config'
import ContestController from '../../service/contest/controller'
import { AdminRoleRequiredMiddleware } from '../../middleware'

router.get('/', (req, res) => {
  ContestController.list().then((data) => {
    return HttpUtils.jsonResponse(res, data)
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

router.post('/', AdminRoleRequiredMiddleware, (req, res) => {
  ContestController.create(req.currentUser, req.body).then(() => {
    return HttpUtils.jsonResponse(res)
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

router.put('/', AdminRoleRequiredMiddleware, (req, res) => {
  ContestController.update(req.body).then(() => {
    return HttpUtils.jsonResponse(res)
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

router.delete('/', AdminRoleRequiredMiddleware, (req, res) => {
  ContestController.delete(req.currentUser, req.query).then(() => {
    return HttpUtils.jsonResponse(res)
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

module.exports = router
