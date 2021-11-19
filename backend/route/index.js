const express = require("express")
const router = express.Router()

router.get('/health-check', function (req, res) {
    res.send({
        env: process.env.NODE_ENV,
        server_port: process.env.PORT
    })
});

router.use('/user', require('./user'))
router.use('/admin', require('./admin'))

module.exports = router