// const mongoose = require('mongoose')
const db = require('../../config/mongoose')

const Record = require('../Record')
// mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
// const db = mongoose.connection

db.once('open', () => {
	console.log('mongodb connected!')
	Record.create({ name: 'KFC', category: '610178cabd76d2725c02eeff', date: '2002-12-09', amount: 185 })
	Record.create({ name: 'IKEA', category: '610178cabd76d2725c02eefc', date: '2002-12-09', amount: 1000 })
	Record.create({ name: 'Bus', category: '610178cabd76d2725c02eefd', date: '2002-12-09', amount: 15 })
	Record.create({ name: 'Steam', category: '610178cabd76d2725c02eefe', date: '2002-12-09', amount: 350 })
	Record.create({ name: '7-11', category: '610178cabd76d2725c02ef00', date: '2002-12-09', amount: 200 })
	console.log('Records done')
})
