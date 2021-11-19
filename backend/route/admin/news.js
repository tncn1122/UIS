import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { HttpUtils, DateTimeUtils } from '../../utils'
import { HTTP_ERROR_CODE, URL} from '../../config'
import NewsController from '../../service/news/controller'

const router = Router()

// create storage to save avatar file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, URL.NEWS_THUMBNAIL.FOLDER)
    },
    filename: function (req, file, cb) {
      cb(
        null,
        // rename file to <userId-timeStamp>.png|jpeg....
        req.currentUser.id + '-' + DateTimeUtils.currentTimestamp() + path.extname(file.originalname)
      )
    },
  });
const upload = multer({ storage })

router.get('/', (req, res, next) => {
    NewsController.listNews(req).then(news =>
        HttpUtils.jsonResponse(res, news)
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.put('/', (req, res, next) => {
  NewsController.updateNews(req.currentUser, req.body).then(news =>
      HttpUtils.jsonResponse(res, news)
  ).catch((error) => {
      return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

router.delete('/', (req, res, next) => {
  NewsController.deleteNews(req.currentUser, req.query).then(news =>
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

router.post('/', (req, res, next) => {
    NewsController.createNews(req).then(news =>
        HttpUtils.jsonResponse(res, news)
    ).catch((error) => {
        return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

router.post('/thumbnail', upload.any(), (req, res, next) => {
    NewsController.uploadThumbnailPicture(req.files).then((data) => {
      return HttpUtils.jsonResponse(res, {message: "success", filename: req.files[0].filename});
    }).catch((error) => {
      return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
  })

module.exports = router