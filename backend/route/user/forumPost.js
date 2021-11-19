import { Router } from 'express'
import { HttpUtils, ValidationUtils } from '../../utils'
import { HTTP_ERROR_CODE} from '../../config'
import ForumPostController from '../../service/forum/post/controller'
import ForumPostLikeDislikeController from '../../service/forum/post/likeDislike/controller'
import { UserLoginRequiredMiddleware, LoginIfPossibleRequiredMiddleware } from '../../middleware'

const router = Router({mergeParams: true})

router.get('/', LoginIfPossibleRequiredMiddleware, (req, res, next) => {
    const topicId = req.params.topicId
    if (!topicId)
        throw new Error("Invalid topic id.")
    ForumPostController.list(req, topicId).then(posts =>
        HttpUtils.jsonResponse(res, posts)
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.post('/', UserLoginRequiredMiddleware, (req, res, next) => {
    const topicId = req.params.topicId
    if (!topicId)
        throw new Error("Invalid topic id.")
    ForumPostController.create(req, topicId).then(topic => 
        HttpUtils.jsonResponse(res, topic, 201) // TODO
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.post('/:id/likes', UserLoginRequiredMiddleware, (req, res, next) => {
    const postId = req.params.id
    ForumPostLikeDislikeController.create(req, postId).then(like =>
        HttpUtils.jsonResponse(res, like, 201) //TODO
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.delete('/:id/likes', UserLoginRequiredMiddleware, (req, res, next) => {
    const postId = req.params.id
    ForumPostLikeDislikeController.delete(req, postId).then(like =>
        HttpUtils.jsonResponse(res, like, 201) //TODO
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

module.exports = router;