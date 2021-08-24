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
  const { name, date, category, amount } = req.body

  Record.find().lean().then(records => {
    let recordIcon = ''
    records.forEach(record => {
      switch (record.category) {
        case '家居物業':
          recordIcon = CATEGORY.home
          break
        case '交通出行':
          recordIcon = CATEGORY.transportation
          break
        case '休閒娛樂':
          recordIcon = CATEGORY.entertainment
          break
        case '餐飲食品':
          recordIcon = CATEGORY.food
          break
        default:
          recordIcon = CATEGORY.other
      }
    })

    let recordLength = []
    recordLength.push(records.length)
    Record.create({
      id: Number(recordLength[0]) + 1,
      name,
      date,
      category,
      amount,
      icon: recordIcon,
    })
      .then(() => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
  })
})

// 編輯分錄的頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => {
      res.render('edit', { record, CATEGORY })
    })
    .catch(error => console.error(error))
})

// 編輯分錄的功能
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body
  return Record.findById(id)
    .then(record => {
      let recordIcon = ''
      switch (record.category) {
        case '家居物業':
          recordIcon = CATEGORY.home
          break
        case '交通出行':
          recordIcon = CATEGORY.transportation
          break
        case '休閒娛樂':
          recordIcon = CATEGORY.entertainment
          break
        case '餐飲食品':
          recordIcon = CATEGORY.food
          break
        default:
          recordIcon = CATEGORY.other
      }

      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      record.icon = recordIcon
      return record.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

// 刪除分錄的功能
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 篩選分錄的功能
router.get('/:category', (req, res) => {
  // 網址上所顯示：選取的分類
  const categoryId = req.query.category
  // 用來篩選分錄的item
  const category = { category: req.query.category }

  return Record.find(category)
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

      const firstRecord = records[0]
      res.render('index', { records, firstRecord })
    })
    .catch(error => console.error(error))
})

module.exports = router
