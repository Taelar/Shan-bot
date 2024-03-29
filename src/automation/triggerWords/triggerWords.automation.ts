import { TriggerWordsKey, TRIGGER_WORDS_COOLDOWN } from './triggerWords.model'
import {
	TRIGGER_WORDS_MAPPING,
	TRIGGER_WORDS_QUOTES,
} from './triggerWords.resources'
import { findEmoji } from '../../utils/emojis.utils'
import { randInt } from '../../utils/random.utils'
import { Automation } from '../../model'

export const triggerWords: Automation = (message, clientUser, state) => {
	const cooldown = state.coolDowns.triggerWords
	if (
		cooldown === null ||
		Date.now() - cooldown.getTime() > TRIGGER_WORDS_COOLDOWN
	) {
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
				state.coolDowns.triggerWords = new Date()
			}
		}
	}
}
