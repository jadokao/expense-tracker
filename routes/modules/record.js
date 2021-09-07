const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Record = require('../../models/Record')
const Category = require('../../models/category.js')

// 取得category id
let { homeId, transportationId, entertainmentId, foodId, otherId } = ''
// 取得category icon
let { homeIcon, transportationIcon, entertainmentIcon, foodIcon, otherIcon } = ''

// 新增分錄的頁面
router.get('/new', async (req, res) => {
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

  res.render('new', { homeId, transportationId, entertainmentId, foodId, otherId })
})

// 新增分錄的功能
router.post('/', async (req, res) => {
  const userId = req.user._id
  let { name, date, category, amount, merchant } = req.body

  Record.find().lean().then(records => {
    // 建立新的分錄
    let recordLength = records.length
    return Record.create({
      id: Number(recordLength),
      name,
      date,
      category,
      amount,
      merchant,
      userId,
    })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  })
})

// 編輯分錄的頁面
router.get('/:id/edit', async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

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

  return Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      record['category'] = record['category'].toString()
      res.render('edit', { record, homeId, transportationId, entertainmentId, foodId, otherId })
    })
    .catch(error => console.error(error))
})

// 編輯分錄的功能
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, category, amount, merchant } = req.body

  return Record.findOne({ _id, userId })
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      record.merchant = merchant
      return record.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

// 刪除分錄的功能
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 篩選分錄的功能
router.get('/:selection', async (req, res) => {
  // 網址上所顯示：取得使用者選取的月份與分類
  let category = req.query.category
  const month = { month: req.query.month }
  // 取得category icon

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
  // 取得各個category的id
  await Category.find().lean().then(categories => {
    categories.forEach(item => {
      switch (item.name) {
        case '家居物業':
          homeId = item._id
          break
        case '交通出行':
          transportationId = item._id
          break
        case '休閒娛樂':
          entertainmentId = item._id
          break
        case '餐飲食品':
          foodId = item._id
          break
        default:
          otherId = item._id
      }
    })
  })
  convertStringToObjectId(category)

  const userId = req.user._id

  return Record.find({ category, userId })
    .lean()
    .then(records => {
      getIconByArray(records, homeIcon, transportationIcon, entertainmentIcon, foodIcon, otherIcon)
      res.render('index', { records, category, homeId, transportationId, entertainmentId, foodId, otherId })
    })
    .catch(error => console.error(error))
})

function getIconByArray (
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
    switch (item.category) {
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

function convertStringToObjectId (string) {
  switch (string) {
    case homeId.toString():
      string = homeId
      break
    case transportationId.toString():
      string = transportationId
      break
    case entertainmentId.toString():
      string = entertainmentId
      break
    case foodId.toString():
      string = foodId
      break
    default:
      string = otherId
  }
}

module.exports = router
