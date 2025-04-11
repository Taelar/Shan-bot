import { Automation } from '../../model'
import { RANDOM_QUOTES } from './randomQuote.resources'
import { getEmoji } from '../../utils/emojis.utils'
import { randInt } from '../../utils/random.utils'

const MAX_RAND = 125

export const randomQuoteAutomation: Automation = (
	message,
	clientUser,
	state,
) => {
	const emojiList = message.guild?.emojis.cache
	const shouldSendQuote = randInt(0, MAX_RAND)
	if (shouldSendQuote !== 0 || !emojiList) return

	const quoteEntryIndex = randInt(0, RANDOM_QUOTES.length - 1)
	const quoteEntry = RANDOM_QUOTES.at(quoteEntryIndex)
	if (!quoteEntry || quoteEntry.quotes.length === 0) return

	const quoteIndex = randInt(0, quoteEntry.quotes.length)
	const quote = quoteEntry.quotes.at(quoteIndex)

	const emote = getEmoji(quoteEntry.emoji, emojiList)

	if (!quote || !emote) return

	message.channel.send(`${emote} ${quote}`)
}
