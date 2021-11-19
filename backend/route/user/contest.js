const router = Router()
import { Router } from 'express'
import { HttpUtils } from '../../utils'
import { HTTP_ERROR_CODE } from '../../config'
import ContestController from '../../service/contest/controller'
import ContestCalendarController from '../../service/contestCalendar/controller'
import { UserLoginRequiredMiddleware, LoginIfPossibleRequiredMiddleware } from '../../middleware'

router.get('/get/:id', (req, res) => {
  ContestController.getById(req.params.id).then((data) => {
    return HttpUtils.jsonResponse(res, data)
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

router.get('/public', LoginIfPossibleRequiredMiddleware, (req, res) => {
  ContestController.getPublic(req.currentUser).then((data) => {
    return HttpUtils.jsonResponse(res, data)
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

// TODO: check if user is registed
router.get('/private', LoginIfPossibleRequiredMiddleware, (req, res) => {
  ContestController.getPrivate(req.query.id).then((data) => {
    return HttpUtils.jsonResponse(res, data)
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

router.post('/add-to-calendar', UserLoginRequiredMiddleware, (req, res) => {
  ContestCalendarController.addToCalendar(req.currentUser, req.body).then(() => {
    return HttpUtils.jsonResponse(res)
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

router.post('/register', UserLoginRequiredMiddleware, (req, res) => {
  ContestController.register(req.currentUser, req.body.contestId).then(() => {
    return HttpUtils.jsonResponse(res)
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

router.post('/visit-room', UserLoginRequiredMiddleware, (req, res) => {
  ContestController.visitRoom(req.currentUser, req.body.id).then((url) => {
    return HttpUtils.jsonResponse(res, url)
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})


module.exports = router
