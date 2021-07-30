const mongoose = require('mongoose')

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false)

// 設定mongoose連線
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo-list'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
	console.log('mongodb error')
})
db.once('open', () => {
	console.log('mongodb connected')
})
module.exports = db
