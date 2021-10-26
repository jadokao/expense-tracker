const express = require('express')
const router = express.Router()
const { ObjectId } = require('mongodb')

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
  const { name, date, category, amount, merchant } = req.body

  Record.find().lean().then(records => {
    // 建立新的分錄
    const recordLength = records.length
    return Record.create({
      id: Number(recordLength),
      name,
      date,
      category,
      amount,
      merchant,
      userId
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
    .then(() => res.redirect('/'))
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
router.get('/filter', async (req, res) => {
  const filter = { userId: req.user._id }
  const selection = req.query.category

  // 網址上所顯示：選取的分類
  const category =
    req.query.category === '全部' || req.query.category === '類別'
      ? ''
      : await Category.findOne({ name: req.query.category }).lean()

  category === '' ? '' : (filter.category = ObjectId(category._id))
  // 網址上所顯示：選取的月份
  const month = req.query.month === '月份' || req.query.month === '全部' ? '' : Number(req.query.month)
  // 如果都沒選
  if (category === '' && month === '') {
    return res.redirect('/')
  }

  return Record.find(filter)
    .populate('category')
    .lean()
    .then(records => {
      const filterRecords = month ? records.filter(record => record.date.getMonth() === month) : records

      res.render('index', {
        records: filterRecords,
        selection,
        month
      })
    })
    .catch(error => console.error(error))
})

module.exports = router
