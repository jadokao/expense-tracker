const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Record = require('../../models/Record')

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
	const id = req.params.id
	return Record.findById(id)
		.lean()
		.then(record => {
			const home = compareTargetCategory(record, '家居物業')
			const transportation = compareTargetCategory(record, '交通出行')
			const entertainment = compareTargetCategory(record, '休閒娛樂')
			const food = compareTargetCategory(record, '餐飲食品')
			const other = compareTargetCategory(record, '其他')

			res.render('edit', { record, home, transportation, entertainment, food, other })
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

	return Record.find(category)
		.lean()
		.then(records => {
			const home = compareTargetCategory(records[0], '家居物業')
			const transportation = compareTargetCategory(records[0], '交通出行')
			const entertainment = compareTargetCategory(records[0], '休閒娛樂')
			const food = compareTargetCategory(records[0], '餐飲食品')
			const other = compareTargetCategory(records[0], '其他')

			res.render('index', { records, categoryId, home, transportation, entertainment, food, other })
		})
		.catch(error => console.error(error))
})

function compareTargetCategory (object, type) {
	return object.category === type ? true : false
}

module.exports = router
