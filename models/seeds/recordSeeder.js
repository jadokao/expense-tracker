// const mongoose = require('mongoose')
const db = require('../../config/mongoose')

const Record = require('../Record')
// mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
// const db = mongoose.connection

const records = require('../../records.json')

db.once('open', () => {
  console.log('mongodb connected!')
  // insert a Array
  Record.insertMany(records)
  console.log('Records done')
})
