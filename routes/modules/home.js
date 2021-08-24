const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const CATEGORY = require('../../models/category.js')

// 首頁：顯示分錄
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => {
        switch (record.category) {
          case '家居物業':
            record['icon'] = CATEGORY.home
            break
          case '交通出行':
            record['icon'] = CATEGORY.transportation
            break
          case '休閒娛樂':
            record['icon'] = CATEGORY.entertainment
            break
          case '餐飲食品':
            record['icon'] = CATEGORY.food
            break
          default:
            record['icon'] = CATEGORY.other
        }
      })
      res.render('index', { records })
    })
    .catch(error => console.error(error))
})

module.exports = router
