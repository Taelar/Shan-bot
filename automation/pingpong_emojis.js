import { PINGPONG_EMOJIS_QUOTES } from '../resources/pingpong_emojis.js'
import { randInt } from './../utils/random.utils.js'
import {
	EMOJI_REGEX,
	findEmoji,
	getEmojiName,
} from './../utils/emojis.utils.js'

export const pingpongEmojis = (message, state) => {
	const { lastMessage } = state
	const { content, channel, author } = message

	if (
		lastMessage.content != undefined &&
		content.match(EMOJI_REGEX) &&
		lastMessage.content.match(EMOJI_REGEX) &&
		author.id != lastMessage.author.id
	) {
		const emoji1 = getEmojiName(lastMessage.content)
		const emoji2 = getEmojiName(content)

		let quotes = PINGPONG_EMOJIS_QUOTES[`${emoji1}/${emoji2}`]
		if (quotes != undefined && quotes.length > 0) {
			const rand = randInt(0, quotes.length)
			const answer = `${findEmoji(emoji1, message)} ${quotes[rand]} ${findEmoji(
				emoji2,
				message,
			)}`
			channel.send(answer)
			return
		}

		quotes = PINGPONG_EMOJIS_QUOTES[`${emoji2}/${emoji1}`]
		if (quotes != undefined && quotes.length > 0) {
			const rand = randInt(0, quotes.length)
			const answer = `${findEmoji(emoji2, message)} ${quotes[rand]} ${findEmoji(
				emoji1,
				message,
			)}`
			channel.send(answer)
			return
		}
	}
}
