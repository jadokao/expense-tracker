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
  password: '12345678'
}

db.once('open', async () => {
  // 建立使用者資料
  await bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(
      async hash =>
        await User.create({
          name: SEED_USER.name,
          email: SEED_USER.email,
          password: hash
        })
    )
    .then(async user => {
      const userId = user._id

      await Promise.all(
        records.map(async record => {
          // 找出該筆record所屬category的資料
          const category = await Category.findOne({ name: record.category }).lean()

          // 替換category id與添加user id
          record.category = category._id
          record['userId'] = userId
        })
      )
    })
    .then(() => Record.insertMany(records))
    .then(() => {
      console.log('Records done')
      process.exit()
    })
})
