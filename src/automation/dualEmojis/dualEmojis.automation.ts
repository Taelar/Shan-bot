import {
	EMOJI_REGEX,
	findEmoji,
	getEmoji,
	getEmojiName,
} from '../../utils/emojis.utils'
import { Automation } from '../../model/Automation'
import { isDefined } from '../../utils/types.utils'
import { randInt } from '../../utils/random.utils'
import { DUAL_EMOJIS_QUOTES, DualEmojisDict } from './dualEmojis.resources'
import { IS_DEV_MODE_ACTIVE, devModeLog } from '../../utils/function.utils'
import { Collection, EmojiResolvable, GuildEmoji } from 'discord.js'

const isDifferentAuthor = (authorId: string, lastMessageAuthorId: string) => {
	return IS_DEV_MODE_ACTIVE || authorId !== lastMessageAuthorId
}

export const dualEmojisAutomation: Automation = (
	message,
	clientUser,
	state,
) => {
	const { lastMessage } = state
	const emojiList = message.guild?.emojis.cache

	if (!lastMessage || !emojiList) return
	if (!isDifferentAuthor(message.author.id, lastMessage.author.id)) return

	const answer = dualEmojiProcessor(
		lastMessage.content,
		message.content,
		emojiList,
		DUAL_EMOJIS_QUOTES,
	)

	if (!answer) return

	message.channel.send(answer)
	// Reset du last message
	state.lastMessage = null
}

export const dualEmojiProcessor = (
	lastMessage: string,
	currentMessage: string,
	emojiList: Collection<string, GuildEmoji>,
	quotes: DualEmojisDict,
) => {
	const currentEmoji = getEmojiName(currentMessage)
	const currentEmojiName = getEmojiName(currentMessage)
	const lastEmoji = getEmojiName(lastMessage)

	if (!currentEmoji || !currentEmojiName || !lastEmoji) return
	if (currentEmoji !== lastEmoji) return

	const emoji = getEmoji(currentEmojiName, emojiList)
	const dedicatedQuotes = quotes[currentEmojiName]
	devModeLog(
		'dual emojis',
		JSON.stringify(emoji),
		JSON.stringify(dedicatedQuotes),
	)

	if (!emoji || !dedicatedQuotes) return

	const formatedEmojisQuotes = dedicatedQuotes.emojis.map(
		(quote) => `${emoji} ${quote} ${emoji}`,
	)
	const possibleQuotes = [...formatedEmojisQuotes, ...dedicatedQuotes.links]

	if (possibleQuotes.length === 0) {
		return emoji.toString()
	}

	const rand = randInt(0, possibleQuotes.length)
	const quote = possibleQuotes.at(rand)

	return quote
}
