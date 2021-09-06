const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Record = require('../../models/Record')
const CATEGORY = require('../../models/category.js')

// 新增分錄的頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增分錄的功能
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount, merchant } = req.body

  Record.find().lean().then(records => {
    // 建立新的分錄
    let recordLength = records.length
    Record.create({
      id: Number(recordLength),
      name,
      date,
      category,
      amount,
      merchant,
      userId,
    }).catch(error => console.error(error))

    res.redirect('/').catch(error => console.error(error))
  })
})

// 編輯分錄的頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      res.render('edit', { record })
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
router.get('/:category', (req, res) => {
  // 網址上所顯示：選取的分類
  const selection = req.query.category
  // 用來篩選分錄的item
  let category = { category: req.query.category }

  // 選擇：全部，沒做篩選
  if (selection === '全部' || selection === '類別') {
    category = {}
  }

  const userId = req.user._id

  return Record.find({ category, userId })
    .lean()
    .then(records => {
      getIconByArray(records)
      res.render('index', { records, selection })
    })
    .catch(error => console.error(error))
})

function getIconByArray (array) {
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
