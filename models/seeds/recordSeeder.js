if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const Record = require('../Record')
const User = require('../user')
const Category = require('../category')

const records = require('../../records.json')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678',
}

db.once('open', async () => {
  // 取得各個category的mongodb id
  let { home, transportation, entertainment, food, other } = ''
  await Category.find().then(categories => {
    categories.forEach(item => {
      switch (item.name) {
        case '家居物業':
          home = item._id
          break
        case '交通出行':
          transportation = item._id
          break
        case '休閒娛樂':
          entertainment = item._id
          break
        case '餐飲食品':
          food = item._id
          break
        default:
          other = item._id
      }
    })
  })

  // 建立使用者資料
  await bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(
      async hash =>
        await User.create({
          name: SEED_USER.name,
          email: SEED_USER.email,
          password: hash,
        })
    )
    .then(async user => {
      const userId = user._id

      await Promise.all(
        records.map(async record => {
          // 把原本的文字改成mongodb id
          switch (record.category) {
            case '家居物業':
              record.category = home
              break
            case '交通出行':
              record.category = transportation
              break
            case '休閒娛樂':
              record.category = entertainment
              break
            case '餐飲食品':
              record.category = food
              break
            default:
              record.category = other
          }

          // 建立分錄資料
          await Record.create({
            id: record.id,
            name: record.name,
            date: record.date,
            amount: record.amount,
            category: record.category,
            merchant: record.merchant,
            userId,
          })
        })
      )
    })
    .then(() => {
      console.log('Records done')
      process.exit()
    })
})
