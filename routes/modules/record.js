const express = require('express')
const router = express.Router()

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
router.get('/:selection', async (req, res) => {
  const selection = req.query.category
  // 網址上所顯示：選取的分類
  const category = req.query.category
  // 網址上所顯示：選取的月份
  const month = req.query.month === '月份' || req.query.month === '全部' ? req.query.month : Number(req.query.month)

  if (category === '類別' && month === '月份') {
    return res.redirect('/')
  }

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

  const userId = req.user._id

  if (category === '類別' || category === '全部') {
    return Record.find({ userId })
      .lean()
      .then(records => {
        getIconByArray(records)

        const filterRecords = records.filter(record => record.date.getMonth() === month)

        res.render('index', {
          records: filterRecords,
          selection,
          month,
          category,
          homeId,
          transportationId,
          entertainmentId,
          foodId,
          otherId
        })
      })
      .catch(error => console.error(error))
  }

  return Record.find({ category, userId })
    .lean()
    .then(records => {
      getIconByArray(records)

      let filterRecords = records.filter(record => record.date.getMonth() === month)

      res.render('index', {
        records: filterRecords,
        selection,
        month,
        category,
        homeId,
        transportationId,
        entertainmentId,
        foodId,
        otherId
      })
    })
    .catch(error => console.error(error))
})

function getIconByArray (array) {
  array.forEach(item => {
    switch (item.category.toString()) {
      case homeId.toString():
        item['icon'] = homeIcon
        break
      case transportationId.toString():
        item['icon'] = transportationIcon
        break
      case entertainmentId.toString():
        item['icon'] = entertainmentIcon
        break
      case foodId.toString():
        item['icon'] = foodIcon
        break
      default:
        item['icon'] = otherIcon
    }
  })
}

module.exports = router
