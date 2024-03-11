import { EMOJI_REGEX, findEmoji, getEmojiName } from '../../utils/emojis.utils'
import { Automation } from '../../model/Automation'
import { isDefined } from '../../utils/types.utils'
import { randInt } from '../../utils/random.utils'
import { DUAL_EMOJIS_QUOTES } from './dualEmojis.resources'
import { IS_DEV_MODE_ACTIVE, devModeLog } from '../../utils/function.utils'

const authorComparison = (authorId: string, lastMessageAuthorId: string) => {
	return IS_DEV_MODE_ACTIVE || authorId !== lastMessageAuthorId
}

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
			authorComparison(author.id, lastMessage.author.id) &&
			emojiName
		) {
			const emoji = findEmoji(emojiName, message)
			const dedicatedQuotes = DUAL_EMOJIS_QUOTES[emojiName]
			console.log('dual emojis', JSON.stringify(dedicatedQuotes))
			devModeLog(JSON.stringify(emoji))

			if (!emoji) {
				return
			}

			if (dedicatedQuotes) {
				const formatedEmojisQuotes = dedicatedQuotes.emojis.map(
					(quote) => `${emoji} ${quote} ${emoji}`,
				)
				const possibleQuotes = [
					...formatedEmojisQuotes,
					...dedicatedQuotes.links,
				]

				if (possibleQuotes.length > 0) {
					const rand = randInt(0, possibleQuotes.length)
					const quote = possibleQuotes.at(rand)
					if (quote) {
						channel.send(quote)
						return
					}
				}
			}
			// Par défaut, on répète juste l'emoji
			channel.send(emoji.toString())
			// Reset du last message
			state.lastMessage = null
		}
	}
}
