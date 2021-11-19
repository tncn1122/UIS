const router = Router()
import { Router } from 'express'
import { HttpUtils } from '../../utils'
import { HTTP_ERROR_CODE } from '../../config'
import FaqController from '../../service/faq/controllerFaq'

router.get('/', (req, res, next) => {
  FaqController.getFaqs(req.query).then((data) => {
    return HttpUtils.jsonResponse(res, data);
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
});

module.exports = router;