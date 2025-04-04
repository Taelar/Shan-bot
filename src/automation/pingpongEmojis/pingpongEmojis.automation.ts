import {
	PINGPONG_EMOJIS_QUOTES,
	PingPongDictionnary,
} from './pingpongEmojis.resources'
import { randInt } from '../../utils/random.utils'
import { getEmoji, getEmojiName } from '../../utils/emojis.utils'
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
	const emoji1Name = getEmojiName(lastMessage)
	const emoji2Name = getEmojiName(currentMessage)

	if (!emoji1Name || !emoji2Name) return

	const pingpongs = [
		`${emoji1Name}/${emoji2Name}`,
		`${emoji2Name}/${emoji1Name}`,
	]
	const quotesEntry = Object.entries(PINGPONG_EMOJIS_QUOTES).find(([key]) =>
		pingpongs.includes(key),
	)
	const quotes = quotesEntry?.at(0)
	devModeLog(
		'pingpong emojis',
		JSON.stringify(pingpongs),
		JSON.stringify(quotes),
	)

	if (!quotes || quotes.length === 0) return

	const rand = randInt(0, quotes.length)

	const emoji1 = getEmoji(emoji1Name, emojiList)
	const emoji2 = getEmoji(emoji2Name, emojiList)

	const answer = `${emoji1} ${quotes[rand]} ${emoji2}`

	return answer
}
