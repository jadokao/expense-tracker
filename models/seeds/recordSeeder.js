// const mongoose = require('mongoose')
const db = require('../../config/mongoose')

const Record = require('../Record')
// mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
// const db = mongoose.connection

db.once('open', () => {
	console.log('mongodb connected!')
	Record.create({ id: 1, name: 'KFC', date: '2002.12.09', amount: 185, category: '餐飲食品' })
	Record.create({ id: 2, name: 'IKEA', date: '2002.12.09', amount: 1000, category: '家居物業' })
	Record.create({ id: 3, name: 'Bus', date: '2002.12.09', amount: 15, category: '交通出行' })
	Record.create({ id: 4, name: 'Steam', date: '2002.12.09', amount: 350, category: '休閒娛樂' })
	Record.create({ id: 5, name: '7-11', date: '2002.12.09', amount: 200, category: '其他' })
	console.log('Records done')
})
