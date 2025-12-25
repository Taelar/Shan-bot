import {
	PINGPONG_EMOJIS_QUOTES,
	PingPongDictionnary,
	PingPongKey,
} from './pingpongEmojis.resources'
import { randInt } from '../../utils/random.utils'
import { extractEmojis, getEmoji, getEmojiName } from '../../utils/emojis.utils'
import { Automation } from '../../model'
import { Collection, GuildEmoji } from 'discord.js'
import { isDifferentAuthor } from '../../utils/message.utils'
import { devModeLog } from '../../utils/function.utils'

export const pingpongEmojis: Automation = (message, clientUser, state) => {
	const { lastMessage } = state
	const { channel } = message
	const emojiList = message.guild?.emojis.cache

	if (!lastMessage || !emojiList) return
	if (!isDifferentAuthor(message.author.id, lastMessage.author.id)) return

	const answer = pingpongEmojisProcessor(
		lastMessage.content,
		message.content,
		emojiList,
		PINGPONG_EMOJIS_QUOTES,
	)

	if (!answer) return

	channel.send(answer)
	// Reset du last message
	state.lastMessage = null
}

export const pingpongEmojisProcessor = (
	lastMessage: string,
	currentMessage: string,
	emojiList: Collection<string, GuildEmoji>,
	dict: PingPongDictionnary,
) => {
	const emojis1 = extractEmojis(lastMessage, emojiList)
	const emojis2 = extractEmojis(currentMessage, emojiList)

	const combinations = emojis1.flatMap((emoji1Name) => {
		return emojis2.flatMap((emoji2Name) => [
			`${emoji1Name.name}/${emoji2Name.name}`,
			`${emoji2Name.name}/${emoji1Name.name}`,
		])
	})

	if (!combinations.length) return

	const quotesEntry = Object.entries(dict).find(([key]) =>
		combinations.includes(key),
	)
	if (!quotesEntry) return

	const [quoteKey, quotes] = quotesEntry as [PingPongKey, Array<string>]
	devModeLog(
		'pingpong emojis',
		JSON.stringify(combinations),
		JSON.stringify(quoteKey),
	)
	if (!quotes.length) return

	const rand = randInt(0, quotes.length)
	const quote = quotes.at(rand)
	if (!quote) return

	const splitedKey = quoteKey.split('/')
	if (splitedKey.length !== 2) return

	const emoji1 = getEmoji(splitedKey.at(0)!, emojiList)
	const emoji2 = getEmoji(splitedKey.at(1)!, emojiList)

	return `${emoji1} ${quote} ${emoji2}`
}
