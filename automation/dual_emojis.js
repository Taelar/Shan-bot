import { EMOJI_REGEX, findEmoji } from './../utils/emojis.utils.js'

export const dualEmojisAutomation = (message, state) => {
	const { content, channel } = message
	const { lastMessage } = state
	if (
		content.match(EMOJI_REGEX) &&
		content == lastMessage.content &&
		author.id != lastMessage.author.id
	) {
		const emojiName = content.split(':')[1]
		let answer
		switch (emojiName.toLowerCase()) {
			case 'sebastian':
				const emoji = findEmoji('sebastian', message)
				answer = `${emoji} **Colo'shan synchronisée** ${emoji}`
				break
			default:
				answer = content
		}

		channel.send(answer)
	}
}
