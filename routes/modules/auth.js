const express = require('express')
const router = express.Router()
const passport = require('passport')

// 向 Facebook 發出登入請求
router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }))

// 登入成功後，從Facebook獲得資料
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

module.exports = router
