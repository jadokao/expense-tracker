const express = require('express')
const router = express.Router()

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入功能
router.post('/login', (req, res) => {
  res.render('/')
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router
