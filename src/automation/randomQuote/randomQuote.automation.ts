import { Automation, AutomationRunner } from '../../model'
import { RANDOM_QUOTES } from './randomQuote.resources'
import { getEmoji } from '../../utils/emojis.utils'
import { randInt } from '../../utils/random.utils'

const MAX_RAND = 125

const randomQuoteRunner: AutomationRunner = (message, clientUser, state) => {
	const emojiList = message.guild?.emojis.cache
	const shouldSendQuote = randInt(0, MAX_RAND)
	if (shouldSendQuote !== 0 || !emojiList) return

	const quoteEntryIndex = randInt(0, RANDOM_QUOTES.length - 1)
	const quoteEntry = RANDOM_QUOTES.at(quoteEntryIndex)
	if (!quoteEntry || quoteEntry.quotes.length === 0) return

	const activeQuotes = quoteEntry.quotes.filter(({ active }) => active)

	const quoteIndex = randInt(0, activeQuotes.length - 1)
	const quote = activeQuotes.at(quoteIndex)

	const emote = getEmoji(quoteEntry.emoji, emojiList)

	if (!quote || !emote) return

	const content = quote.custom ?? quote.original
	message.channel.send(`${emote} ${content}`)
	return true
}

export const randomQuote: Automation = {
	role: 'message',
	antiAffinities: ['message'],
	runner: randomQuoteRunner,
}
