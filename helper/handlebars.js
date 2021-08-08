module.exports = {
	eq: function (a, b) {
		if (a === b) {
			return true
		} else {
			return false
		}
	},
	total: function (array) {
		let sum = 0

		array.forEach(function (doc) {
			sum += doc.amount
		})

		return sum // return total
	},
	dateFormate: function (date) {
		return date.toJSON().substring(0, 10)
	},
}
