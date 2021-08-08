const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Record = require('../../models/Record')
const Category = require('../../models/Category')

// 新增分錄的頁面
router.get('/new', (req, res) => {
	res.render('new')
})

// 新增分錄的功能
router.post('/', (req, res) => {
	const { name, date, category, amount } = req.body

	let recordLength = []
	Record.find().lean().then(records => {
		console.log(records.length)
		recordLength.push(records.length)
		return Record.create({
			id: Number(recordLength[0]) + 1,
			name,
			date,
			category,
			amount,
		})
			.then(() => {
				res.redirect('/')
			})
			.catch(error => console.error(error))
	})
})

// 編輯分錄的頁面
router.get('/:id/edit', (req, res) => {
	let categories = []
	Category.find().lean().then(item => {
		categories.push(...item)
	})
	const id = req.params.id
	return Record.findById(id)
		.lean()
		.then(record => {
			let recordCategory = ''
			if (records.length > 0) {
				recordCategory = records[0].category._id.toString()
			}

			const home = compareTargetCategory(categories, '家居物業', recordCategory)
			const transportation = compareTargetCategory(categories, '交通出行', recordCategory)
			const entertainment = compareTargetCategory(categories, '休閒娛樂', recordCategory)
			const food = compareTargetCategory(categories, '餐飲食品', recordCategory)
			const other = compareTargetCategory(categories, '其他', recordCategory)

			res.render('edit', { record, categories, home, transportation, entertainment, food, other })
		})
		.catch(error => console.error(error))
})

// 編輯分錄的功能
router.put('/:id', (req, res) => {
	const id = req.params.id
	const { name, date, category, amount } = req.body
	return Record.findById(id)
		.then(record => {
			record.name = name
			record.date = date
			record.category = category
			record.amount = amount
			return record.save()
		})
		.then(() => res.redirect(`/`))
		.catch(error => console.log(error))
})

// 刪除分錄的功能
router.delete('/:id', (req, res) => {
	const id = req.params.id
	return Record.findById(id)
		.then(record => record.remove())
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
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
	return founded._id.toString() === target ? true : false
}

module.exports = router
