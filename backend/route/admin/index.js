import { Router } from 'express'
const router = Router()
import { UserLoginRequiredMiddleware, PowerRoleRequiredMiddleware  } from '../../middleware'

// public
router.use('/auth', require('./auth'))


// private: login required
router.use('/user', UserLoginRequiredMiddleware, PowerRoleRequiredMiddleware, require('./user'))
router.use('/contest', UserLoginRequiredMiddleware, PowerRoleRequiredMiddleware, require('./contest'))
router.use('/faq', UserLoginRequiredMiddleware, PowerRoleRequiredMiddleware, require('./faq'))
router.use('/news', UserLoginRequiredMiddleware, PowerRoleRequiredMiddleware, require('./news'))
router.use('/individual', UserLoginRequiredMiddleware, PowerRoleRequiredMiddleware, require('./individual'))
router.use('/team', UserLoginRequiredMiddleware, PowerRoleRequiredMiddleware, require('./team'))

module.exports = router
