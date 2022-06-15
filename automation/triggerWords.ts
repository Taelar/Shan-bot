import { Automation } from '../model'
import { TriggerWordsKey, TRIGGER_WORDS } from '../model/TriggerWords'
import {
	TRIGGER_WORDS_MAPPING,
	TRIGGER_WORDS_QUOTES,
} from '../resources/triggerWords'
import { findEmoji } from '../utils/emojis.utils'
import { randInt } from '../utils/random.utils'

export const triggerWords: Automation = (message, clientUser, state) => {
	const foundTriggerEntry = Object.entries(TRIGGER_WORDS_MAPPING).find(
		([key, words]) => {
			return words.find((word) => {
				const cleanedMessage = message.content
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.toLowerCase()
				return cleanedMessage.includes(word)
			})
		},
	)
	if (foundTriggerEntry) {
		const triggerKey = foundTriggerEntry[0] as TriggerWordsKey
		const quotes = TRIGGER_WORDS_QUOTES[triggerKey]
		const quoteRand = randInt(0, quotes.length)
		const quoteEntry = quotes[quoteRand]

		if (quoteEntry) {
			const emoji = findEmoji(quoteEntry.emoji, message)
			message.channel.send(`${quoteEntry.quote} ${emoji}`)
		}
	}
}
