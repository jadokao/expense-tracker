const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')

const categories = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
const icons = ['fas fa-home', 'fas fa-shuttle-van', 'fas fa-grin-beam', 'fas fa-utensils', 'fas fa-pen']

// 首頁：顯示分錄
router.get('/', (req, res) => {
	Record.find()
		.lean()
		.then(records => {
			console.log(records[0].date.toJSON().substring(0, 10))
			res.render('index', { records, categories, icons })
		})
		.catch(error => console.error(error))
})

// // 篩選分錄的功能
// router.get('/:category', (req, res) => {
// 	// 網址上所顯示：選取的分類
// 	const categoryId = req.query.category
// 	// 用來篩選分錄的item
// 	const category = { category: req.query.category }

// 	let categories = []
// 	Category.find().lean().then(item => {
// 		categories.push(...item)
// 	})

// 	return Record.find(category)
// 		.lean()
// 		.populate('category')
// 		.then(records => {
// 			let recordCategory = ''
// 			if (records.length > 0) {
// 				recordCategory = records[0].category._id.toString()
// 			}

// 			const home = compareTargetCategory(categories, '家居物業', recordCategory)
// 			const transportation = compareTargetCategory(categories, '交通出行', recordCategory)
// 			const entertainment = compareTargetCategory(categories, '休閒娛樂', recordCategory)
// 			const food = compareTargetCategory(categories, '餐飲食品', recordCategory)
// 			const other = compareTargetCategory(categories, '其他', recordCategory)

// 			res.render('index', { records, categories, categoryId, home, transportation, entertainment, food, other })
// 		})
// 		.catch(error => console.error(error))
// })

// function compareTargetCategory (array, type, target) {
// 	let founded = array.find(item => item.category.toString() === type)
// 	return founded._id.toString() === target ? true : false
// }

module.exports = router
