if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const Category = require('../category')

const categories = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
const icons = ['fas fa-home', 'fas fa-shuttle-van', 'fas fa-grin-beam', 'fas fa-utensils', 'fas fa-pen']

db.once('open', async () => {
  for (let i = 0; i < categories.length; i++) {
    await Category.create({ name: categories[i], icon: icons[i] })
  }
  console.log('Categories done')
  process.exit()
})
