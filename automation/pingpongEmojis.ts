import { PINGPONG_EMOJIS_QUOTES } from '../resources/pingpongEmojis'
import { randInt } from '../utils/random.utils'
import { EMOJI_REGEX, findEmoji, getEmojiName } from '../utils/emojis.utils'
import { Automation } from '../model'

export const pingpongEmojis: Automation = (message, clientUser, state) => {
	const { lastMessage } = state
	const { content, channel, author } = message

	if (
		lastMessage?.content != undefined &&
		content.match(EMOJI_REGEX) &&
		lastMessage.content.match(EMOJI_REGEX) &&
		author.id != lastMessage.author.id
	) {
		const emoji1 = getEmojiName(lastMessage.content)
		const emoji2 = getEmojiName(content)

		if (emoji1 && emoji2) {
			const pingpongs = [`${emoji1}/${emoji2}`, `${emoji2}/${emoji1}`]
			let quotes = Object.entries(PINGPONG_EMOJIS_QUOTES).find(([key]) => {
				return pingpongs.includes(key)
			})?.[1]

			if (quotes != undefined && quotes.length > 0) {
				const rand = randInt(0, quotes.length)
				const answer = `${findEmoji(emoji1, message)} ${
					quotes[rand]
				} ${findEmoji(emoji2, message)}`
				channel.send(answer)
				return
			}
		}
	}
}
