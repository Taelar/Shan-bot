const resources = require('../resources/perceval.json')
const emojisUtils = require('../utils/emojis.utils')
const MAX_RAND = 2

module.exports = {
	execute(message, state) {
		const rand = Math.floor(Math.random() * MAX_RAND + 1) // [1:200]
		console.log(`Perceval rand: ${rand}`)
		if (rand == 1) {
			const index = Math.floor(Math.random() * resources.items.length)
			const quote = resources.items[index]
			const emote = emojisUtils.find('perceval', message)
			message.channel.send(`${emote} ${quote}`)
		}
	},
}
