import { EMOJI_REGEX, findEmoji, getEmojiName } from '../utils/emojis.utils'
import { DUAL_EMOJIS_QUOTES } from '../resources/dual_emojis'
import { Automation } from '../model/Automation'
import { isDefined } from '../utils/types.utils'

export const dualEmojisAutomation: Automation = (
	message,
	clientUser,
	state,
) => {
	const { lastMessage } = state
	const { content, channel, author } = message

	if (
		isDefined(lastMessage?.content) &&
		content.match(EMOJI_REGEX) &&
		lastMessage
	) {
		const currentEmoji = getEmojiName(content)
		const lastEmoji = getEmojiName(lastMessage.content)
		const emojiName = getEmojiName(content)

		if (
			currentEmoji === lastEmoji &&
			author.id !== lastMessage.author.id &&
			emojiName
		) {
			const emoji = findEmoji(emojiName, message)
			const dedicatedQuotes = DUAL_EMOJIS_QUOTES[emojiName]

			if (emoji) {
				let answer = `${emoji}`
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
	}
}
