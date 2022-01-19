import {
	EMOJI_REGEX,
	findEmoji,
	getEmojiName,
} from './../utils/emojis.utils.js'
import { DUAL_EMOJIS_QUOTES } from '../resources/dual_emojis.js'

export const dualEmojisAutomation = (message, state) => {
	const { lastMessage } = state
	const { content, channel, author } = message

	if (
		lastMessage.content != undefined &&
		content.match(EMOJI_REGEX) &&
		getEmojiName(content) == getEmojiName(lastMessage.content) &&
		author.id != lastMessage.author.id
	) {
		let answer = `${emoji}`
		const emojiName = getEmojiName(content)
		const emoji = findEmoji(emojiName, message)
		const dedicatedQuotes = DUAL_EMOJIS_QUOTES[emojiName]

		if (dedicatedQuotes != undefined && dedicatedQuotes.length > 0) {
			const rand = Math.floor(Math.random() * dedicatedQuotes.length + 1)
			if (rand !== dedicatedQuotes.length) {
				const quote = dedicatedQuotes[rand]
				answer = `${emoji} ${quote} ${emoji}`
			}
		}

		channel.send(answer)
	}
}
