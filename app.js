const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const routes = require('./routes')
const usePassport = require('./config/passport')

// 引用mongoose相關設定
require('./config/mongoose')

const app = express()

const PORT = process.env.PORT || 3000

// 載入 Record model
const Record = require('./models/Record')

app.use(bodyParser.urlencoded({ extended: true }))

// 設定handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: require('./helper/handlebars') }))
app.set('view engine', 'hbs')

app.use(methodOverride('_method'))

app.use(
  session({
    secret: 'trackerSecret',
    resave: false,
    saveUninitialized: true,
  })
)

usePassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
