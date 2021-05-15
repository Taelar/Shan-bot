const dualEmojis = require('./dual_emojis')
const perceval = require('./perceval')

const automationFunctions = [dualEmojis, perceval]

module.exports = {
	execute(message, state) {
		automationFunctions.forEach((aut) => aut.execute(message, state))
	},
}
