const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const CATEGORY = require('../../models/category.js')

// 首頁：顯示分錄
router.get('/', (req, res) => {
  const userId = req.user._id

  Record.find({ userId })
    .lean()
    .then(records => {
      getIcon(records)
      res.render('index', { records })
    })
    .catch(error => console.error(error))
})

function getIcon (array) {
  array.forEach(item => {
    switch (item.category) {
      case '家居物業':
        item['icon'] = CATEGORY.home
        break
      case '交通出行':
        item['icon'] = CATEGORY.transportation
        break
      case '休閒娛樂':
        item['icon'] = CATEGORY.entertainment
        break
      case '餐飲食品':
        item['icon'] = CATEGORY.food
        break
      default:
        item['icon'] = CATEGORY.other
    }
  })
}

module.exports = router
