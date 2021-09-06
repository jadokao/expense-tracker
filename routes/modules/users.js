const express = require('express')
const router = express.Router()

const User = require('../../models/user')

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

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  User.findOne({ email }).then(user => {
    if (user) {
      console.log('user already exists')
      res.render('register', { name, email, password, confirmPassword })
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

module.exports = router
