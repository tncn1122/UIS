const router = Router()
import { Router } from 'express'
import { HttpUtils } from '../../utils'
import UserModel from "../../service/user/modelUser";

router.get('/sync', (req, res) => {
  return HttpUtils.jsonResponse(res, UserModel.serialize(req.currentUser))
})

module.exports = router
