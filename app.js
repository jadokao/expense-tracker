const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

// 引用mongoose相關設定
require('./config/mongoose')

const app = express()

const PORT = process.env.PORT || 3000

// 載入 Record 和 Category model
const Record = require('./models/Record')
const Category = require('./models/Category')

app.use(bodyParser.urlencoded({ extended: true }))

// 設定handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: require('./helper/handlebars') }))
app.set('view engine', 'hbs')

app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, () => {
	console.log(`App is running on http://localhost:${PORT}`)
})
