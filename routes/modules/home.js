const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const Category = require('../../models/category.js')

// 首頁：顯示分錄
router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .populate('category')
    .lean()
    .then(records => {
      records.forEach(record => {
        record['icon'] = record.category.icon
        record['category'] = record.category
      })
      res.render('index', { records })
    })
    .catch(error => console.error(error))
})

module.exports = router
