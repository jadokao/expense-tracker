const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const Category = require('../../models/category.js')

// 首頁：顯示分錄
router.get('/', (req, res) => {
  const userId = req.user._id

  Record.find({ userId })
    .lean()
    .then(async records => {
      // 取得category icon
      let { homeIcon, transportationIcon, entertainmentIcon, foodIcon, otherIcon } = ''
      await Category.find().lean().then(categories => {
        categories.forEach(item => {
          switch (item.name) {
            case '家居物業':
              homeIcon = item.icon
              break
            case '交通出行':
              transportationIcon = item.icon
              break
            case '休閒娛樂':
              entertainmentIcon = item.icon
              break
            case '餐飲食品':
              foodIcon = item.icon
              break
            default:
              otherIcon = item.icon
          }
        })
      })

      // 取得category id
      let { homeId, transportationId, entertainmentId, foodId, otherId } = ''
      await Category.find().lean().then(categories => {
        categories.forEach(item => {
          switch (item.name) {
            case '家居物業':
              homeId = item._id.toString()
              break
            case '交通出行':
              transportationId = item._id.toString()
              break
            case '休閒娛樂':
              entertainmentId = item._id.toString()
              break
            case '餐飲食品':
              foodId = item._id.toString()
              break
            default:
              otherId = item._id.toString()
          }
        })
      })

      getIcon(
        records,
        homeIcon,
        transportationIcon,
        entertainmentIcon,
        foodIcon,
        otherIcon,
        homeId,
        transportationId,
        entertainmentId,
        foodId,
        otherId
      )

      res.render('index', { records, homeId, transportationId, entertainmentId, foodId, otherId })
    })
    .catch(error => console.error(error))
})

function getIcon (
  array,
  home,
  transportation,
  entertainment,
  food,
  other,
  homeId,
  transportationId,
  entertainmentId,
  foodId,
  otherId
) {
  array.forEach(item => {
    switch (item.category.toString()) {
      case homeId:
        item['icon'] = home
        break
      case transportationId:
        item['icon'] = transportation
        break
      case entertainmentId:
        item['icon'] = entertainment
        break
      case foodId:
        item['icon'] = food
        break
      default:
        item['icon'] = other
    }
  })
}

module.exports = router
