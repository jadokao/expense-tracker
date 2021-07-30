const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Record = require('../../models/Record')
const Category = require('../../models/Category')

// 新增分錄的頁面
router.get('/new', (req, res) => {
	let categories = []
	Category.find().lean().then(item => {
		categories.push(...item)
	})
	res.render('new', { categories })
})

// 新增分錄的功能
router.post('/', (req, res) => {
	const { name, date, category, amount } = req.body
	return Record.findOneAndUpdate(
		{ _id: mongoose.Types.ObjectId() },
		{ name, date, category, amount },
		{
			new: true,
			upsert: true,
			runValidators: true,
			setDefaultsOnInsert: true,
			populate: 'category',
		}
	)
		.then(() => res.redirect('/'))
		.catch(error => console.error(error))
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

function compareTargetCategory (array, type, target) {
	let founded = array.find(item => item.category.toString() === type)
	if (found.length > 0) {
		founded = founded._id.toString()
	}
	return founded === target ? true : false
}

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

module.exports = router
