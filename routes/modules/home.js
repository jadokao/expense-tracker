const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const Category = require('../../models/Category')

// 首頁：顯示分錄
router.get('/', (req, res) => {
	let categories = []
	Category.find().lean().then(item => {
		categories.push(...item)
	})
	Record.find()
		.lean()
		.populate('category')
		.then(records => {
			res.render('index', { records, categories })
		})
		.catch(error => console.error(error))
})

// 篩選分錄的功能
router.get('/:category', (req, res) => {
	// 網址上所顯示：選取的分類
	const categoryId = req.query.category
	// 用來篩選分錄的item
	const category = { category: req.query.category }

	let categories = []
	Category.find().lean().then(item => {
		categories.push(...item)
	})

	return Record.find(category)
		.lean()
		.populate('category')
		.then(records => {
			let recordCategory = ''
			if (records.length > 0) {
				recordCategory = records[0].category._id.toString()
			}

			const home = compareTargetCategory(categories, '家居物業', recordCategory)
			const transportation = compareTargetCategory(categories, '交通出行', recordCategory)
			const entertainment = compareTargetCategory(categories, '休閒娛樂', recordCategory)
			const food = compareTargetCategory(categories, '餐飲食品', recordCategory)
			const other = compareTargetCategory(categories, '其他', recordCategory)

			res.render('index', { records, categories, categoryId, home, transportation, entertainment, food, other })
		})
		.catch(error => console.error(error))
})

function compareTargetCategory (array, type, target) {
	let founded = array.find(item => item.category.toString() === type)
	if (found.length > 0) {
		founded = founded._id.toString()
	}
	return founded === target ? true : false
}

module.exports = router
