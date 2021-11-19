import { Router } from 'express'
import { HttpUtils, ValidationUtils } from '../../utils'
import { HTTP_ERROR_CODE} from '../../config'
import ForumTopicController from '../../service/forum/topic/controller'
import ViewController from '../../service/forum/topic/view/controller'
import { UserLoginRequiredMiddleware } from '../../middleware'

const router = Router({mergeParams: true})

router.get('/', (req, res, next) => {
    const forumId = req.params.forumId
    if (!forumId)
        throw new Error("Invalid forum id.")
    ForumTopicController.list(req, forumId).then(topics =>
        HttpUtils.jsonResponse(res, topics)
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.post('/', UserLoginRequiredMiddleware, (req, res, next) => {
    const forumId = req.params.forumId
    if (!forumId)
        throw new Error("Invalid forum id.")
    ForumTopicController.create(req, forumId).then(topic =>
        HttpUtils.jsonResponse(res, topic, 201) // TODO
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.get('/:id', (req, res, next) => {
    const topicId = req.params.id
    ForumTopicController.getById(topicId).then(topic =>
        HttpUtils.jsonResponse(res, topic)
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

// VIEWS
router.post('/:id/views', UserLoginRequiredMiddleware, (req, res, next) => {
    const topicId = req.params.id
    ViewController.create(req, topicId).then(view =>
        HttpUtils.jsonResponse(res, view, 201) // TODO
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.use('/:topicId/posts', require('./forumPost'))


module.exports = router;