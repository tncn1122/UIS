const router = Router()
import { Router } from 'express'
import { HttpUtils } from '../../utils'
import TeamController from "../../service/team/controller";

router.get('/all', (req, res) => {
  TeamController.getAll().then((data) => {
    return HttpUtils.jsonResponse(res, data)
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

module.exports = router
