const tripleEmoji = require('./triple_emoji')

const automationFunctions = [tripleEmoji]

module.exports = {
	execute(message, state) {
		automationFunctions.forEach((aut) => aut.execute(message, state))
	},
}
