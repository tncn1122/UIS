import { Router } from 'express'
import { HttpUtils, ValidationUtils } from '../../utils'
import { HTTP_ERROR_CODE} from '../../config'
import NewsController from '../../service/news/controller'
import CommentsController from '../../service/news/comments/controller'
import CommentsLikeController from '../../service/news/comments/likes/controller'
import ViewsController from '../../service/news/views/controller'
import { UserLoginRequiredMiddleware } from '../../middleware'

const router = Router()

router.get('/', (req, res, next) => {
    NewsController.listNews(req).then(news =>
        HttpUtils.jsonResponse(res, news)
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.get('/:id', (req, res, next) => {
    const newsId = req.params.id
    NewsController.getNewsById(newsId).then(news =>
        HttpUtils.jsonResponse(res, news)
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.get('/:id/comments', UserLoginRequiredMiddleware, (req, res, next) => {
    const newsId = req.params.id
    CommentsController.listCommentsByNewsId(newsId, req).then(comments =>
        HttpUtils.jsonResponse(res, comments)
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.post('/:id/comments', UserLoginRequiredMiddleware, (req, res, next) => {
    const newsId = req.params.id
    CommentsController.createNewsComment(req, newsId).then(comment =>
        HttpUtils.jsonResponse(res, comment, 201) // TODO
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.post('/:newsId/comments/:commentId', UserLoginRequiredMiddleware, (req, res, next) => {
    const newsId = req.params.newsId
    const commentId = req.params.commentId
    CommentsController.createNewsComment(req, newsId, commentId).then(comment =>
        HttpUtils.jsonResponse(res, comment, 201) //TODO
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.post('/:newsId/comments/:commentId/likes', UserLoginRequiredMiddleware, (req, res, next) => {
    const newsId = req.params.newsId
    const commentId = req.params.commentId
    CommentsLikeController.createNewsCommentLike(req, newsId, commentId).then(like =>
        HttpUtils.jsonResponse(res, like, 201) //TODO
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.delete('/:newsId/comments/:commentId/likes', UserLoginRequiredMiddleware, (req, res, next) => {
    const newsId = req.params.newsId
    const commentId = req.params.commentId
    CommentsLikeController.deleteNewsCommentLike(req, newsId, commentId).then(like =>
        HttpUtils.jsonResponse(res, like, 201) //TODO
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

// VIEWS
router.post('/:id/views', UserLoginRequiredMiddleware, (req, res, next) => {
    const newsId = req.params.id
    ViewsController.createNewsView(req, newsId).then(view =>
        HttpUtils.jsonResponse(res, view, 201) // TODO
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

module.exports = router;