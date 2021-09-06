const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('../../models/user')

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入功能
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })
)

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊功能
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      res.render('register', { errors, name, email, password, confirmPassword })
    } else {
      return User.create({
        name,
        email,
        password,
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
})

// 登出功能
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出！')
  res.redirect('/users/login')
})

module.exports = router
