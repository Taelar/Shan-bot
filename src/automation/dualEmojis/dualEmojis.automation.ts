import {
	extractEmojis,
	getEmoji,
	getEmojiName,
	isKnownEmoji,
} from '../../utils/emojis.utils'
import { Automation, AutomationRunner } from '../../model/Automation'
import { randInt } from '../../utils/random.utils'
import { DUAL_EMOJIS_QUOTES, DualEmojisDict } from './dualEmojis.resources'
import { devModeLog } from '../../utils/function.utils'
import { Collection, GuildEmoji } from 'discord.js'
import { isDifferentAuthor } from '../../utils/message.utils'
import { isDefined } from '../../utils/types.utils'

const dualEmojisRunner: AutomationRunner = (message, clientUser, state) => {
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

	return true
}

export const dualEmojiProcessor = (
	lastMessage: string,
	currentMessage: string,
	emojiList: Collection<string, GuildEmoji>,
	quotes: DualEmojisDict,
) => {
	const currentEmojis = extractEmojis(currentMessage, emojiList)
	const lastEmojis = extractEmojis(lastMessage, emojiList)

	const emojiIntersection = currentEmojis.filter((emoji) =>
		lastEmojis.includes(emoji),
	)
	devModeLog(
		'dual emojis intersection',
		JSON.stringify(currentEmojis),
		JSON.stringify(lastEmojis),
		JSON.stringify(emojiIntersection),
	)
	if (!emojiIntersection.length) return

	const sanitiziedEmojis = emojiIntersection
		.map(({ name }) => name)
		.filter(isDefined)

	const emojiRand = randInt(0, sanitiziedEmojis.length)
	const emojiName = sanitiziedEmojis.at(emojiRand)
	if (!emojiName) return

	const emoji = getEmoji(emojiName, emojiList)
	if (!emoji) return

	if (!isKnownEmoji(emojiName)) {
		return emoji.toString()
	}

	const dedicatedQuotes = quotes[emojiName]
	devModeLog(
		'dual emojis dedicatedQuotes',
		JSON.stringify(emoji),
		JSON.stringify(dedicatedQuotes),
	)

	if (!emoji || !dedicatedQuotes) return

	const formatedEmojisQuotes = dedicatedQuotes.emojis.map(
		(quote) => `${emoji} ${quote} ${emoji}`,
	)
	const possibleQuotes_ = [...formatedEmojisQuotes, ...dedicatedQuotes.links]

	if (possibleQuotes_.length === 0) {
		return emoji.toString()
	}

	const rand = randInt(0, possibleQuotes_.length)
	const quote = possibleQuotes_.at(rand)

	return quote
}

export const dualEmojis: Automation = {
	role: 'message',
	antiAffinities: ['message'],
	runner: dualEmojisRunner,
}
