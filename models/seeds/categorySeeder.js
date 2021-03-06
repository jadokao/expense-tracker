if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const Category = require('../category')

const categories = [
  { name: '家居物業', name_en: 'home', icon: 'fas fa-home' },
  { name: '交通出行', name_en: 'transportation', icon: 'fas fa-shuttle-van' },
  { name: '休閒娛樂', name_en: 'entertainment', icon: 'fas fa-grin-beam' },
  { name: '餐飲食品', name_en: 'food', icon: 'fas fa-utensils' },
  { name: '其他', name_en: 'other', icon: 'fas fa-pen' }
]

db.once('open', async () => {
  await Category.create(categories).then(() => console.log('Categories done'))
  process.exit()
})
