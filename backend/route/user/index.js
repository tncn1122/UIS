import { Router } from 'express'
const router = Router()
import { UserLoginRequiredMiddleware  } from '../../middleware'

// public
router.use('/auth', require('./auth'))
router.use('/activate', require('./activate'))
router.use('/profile', require('./profile'))
router.use('/faq', require('./faq'))

// public & private
router.use('/news', require('./news'))
router.use('/forum/forums', require('./forum'))
router.use('/forum/categories', require('./forumCategory'))
router.use('/forum/topics/', require('./forumTopic'))
router.use('/forum/posts/', require('./forumPost'))
router.use('/forum/posts/', require('./forumPost'))
router.use('/contest', require('./contest'))

// private: login required
router.use('/user', UserLoginRequiredMiddleware, require('./user'))
router.use('/information', UserLoginRequiredMiddleware, require('./information'))
router.use('/team', UserLoginRequiredMiddleware, require('./team'))

module.exports = router
