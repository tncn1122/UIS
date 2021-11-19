import { Router } from 'express'
import { HttpUtils, ValidationUtils } from '../../utils'
import { HTTP_ERROR_CODE} from '../../config'
import ForumCategoryController from '../../service/forum/category/controller'
import { UserLoginRequiredMiddleware } from '../../middleware'

const router = Router()

router.get('/', (req, res, next) => {
    ForumCategoryController.list(req).then(categories =>
        HttpUtils.jsonResponse(res, categories)
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.use('/:categoryId/forums', require('./forum'))

module.exports = router;