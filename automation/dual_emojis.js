import {
	EMOJI_REGEX,
	findEmoji,
	getEmojiName,
} from './../utils/emojis.utils.js'

export const dualEmojisAutomation = (message, state) => {
	const { lastMessage } = state
	const { content, channel, author } = message

	if (
		lastMessage.content != undefined &&
		content.match(EMOJI_REGEX) &&
		getEmojiName(content) == getEmojiName(lastMessage.content) &&
		author.id != lastMessage.author.id
	) {
		const emojiName = getEmojiName(content)
		let answer
		let emoji
		switch (emojiName.toLowerCase()) {
			case 'sebastian':
				emoji = findEmoji('sebastian', message)
				answer = `${emoji} **Colo'shan synchronisée** ${emoji}`
				break
			case 'duh':
				emoji = findEmoji('duh', message)
				answer = `${emoji} **Colo'shan demeurée** ${emoji}`
				break
			default:
				answer = content
		}

		channel.send(answer)
	}
}
