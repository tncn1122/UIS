import { Router } from 'express'
import { HttpUtils, ValidationUtils } from '../../utils'
import { HTTP_ERROR_CODE} from '../../config'
import ForumController from '../../service/forum/controller'
import { UserLoginRequiredMiddleware } from '../../middleware'

const router = Router({mergeParams: true})

router.get('/', (req, res, next) => {
    const categoryId = req.params.categoryId
    if (!categoryId)
        throw new Error("Invalid category id.")
    ForumController.list(req, categoryId).then(forums =>
        HttpUtils.jsonResponse(res, forums)
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.get('/:id', (req, res, next) => {
    const forumId = req.params.id
    ForumController.getById(forumId).then(forum =>
        HttpUtils.jsonResponse(res, forum)
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.use('/:forumId/topics', require('./forumTopic'))

module.exports = router;