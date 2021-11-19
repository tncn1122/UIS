const router = Router()
import { Router } from 'express'
import { HttpUtils } from '../../utils'
import { HTTP_ERROR_CODE } from '../../config'
import UserController from '../../service/user/controllerUser'

router.get('/:id', (req, res, next) => {
  // 
  UserController.getUserProfile(req.params.id).then((data) => {
    return HttpUtils.jsonResponse(res, data);
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
});

module.exports = router;