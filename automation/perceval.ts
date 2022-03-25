import { Automation } from '../model'
import { PERCEVAL_QUOTES } from '../resources/perceval'
import { findEmoji } from '../utils/emojis.utils'
import { randInt } from '../utils/random.utils'

const MAX_RAND = 125

export const percevalAutomation: Automation = (message, clientUser, state) => {
	const rand = randInt(1, MAX_RAND)
	if (rand == 1) {
		const index = Math.floor(Math.random() * PERCEVAL_QUOTES.length)
		const quote = PERCEVAL_QUOTES[index]
		const emote = findEmoji('perceval', message)
		if (emote) {
			message.channel.send(`${emote} ${quote}`)
		}
	}
}
