import { PERCEVAL_QUOTES } from '../resources/perceval.js'
import { findEmoji } from '../utils/emojis.utils.js'
import { randInt } from '../utils/random.utils.js'

const MAX_RAND = 75

export const percevalAutomation = (message, state) => {
	const rand = randInt(1, MAX_RAND)
	if (rand == 1) {
		const index = Math.floor(Math.random() * PERCEVAL_QUOTES.length)
		const quote = PERCEVAL_QUOTES[index]
		const emote = findEmoji('perceval', message)
		message.channel.send(`${emote} ${quote}`)
	}
}
