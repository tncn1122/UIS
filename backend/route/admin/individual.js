const router = Router()
import { Router } from 'express'
import { HttpUtils } from '../../utils'
import UserController from '../../service/user/controllerUser'

router.get('/all', (req, res) => {
  UserController.getAllUsers().then((users) => {
    return HttpUtils.jsonResponse(res, users)
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

router.put('/:id/change-role', (req, res) => {
  UserController.changeRole(req.params.id, req.body).then(() => {
    return HttpUtils.jsonResponse(res)
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

module.exports = router
