const db = require('../../config/mongoose')

const Category = require('../category')

const categories = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
const icons = ['fas fa-home', 'fas fa-shuttle-van', 'fas fa-grin-beam', 'fas fa-utensils', 'fas fa-pen']

db.once('open', () => {
  console.log('mongodb connected')
  for (let i = 0; i < categories.length; i++) {
    Category.create({ category: categories[i], icon: icons[i] })
  }
  console.log('Categories done')
})
