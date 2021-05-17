import { PERCEVAL_QUOTES } from '../resources/perceval.js'
import { findEmoji } from '../utils/emojis.utils.js'

const MAX_RAND = 50

export const percevalAutomation = (message, state) => {
	const rand = Math.floor(Math.random() * MAX_RAND + 1) // [1:MAX_RAND]
	if (rand == 1) {
		const index = Math.floor(Math.random() * PERCEVAL_QUOTES.length)
		const quote = PERCEVAL_QUOTES[index]
		const emote = findEmoji('perceval', message)
		message.channel.send(`${emote} ${quote}`)
	}
}
