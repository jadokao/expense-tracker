// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

// 準備引入路由模組
const record = require('./modules/record')
router.use('/records', authenticator, record)

const user = require('./modules/users')
router.use('/users', user)

const auth = require('./modules/auth')
router.use('/auth', auth)

const home = require('./modules/home')
router.use('/', authenticator, home)

// 匯出路由器
module.exports = router
