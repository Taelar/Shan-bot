import { findEmoji } from './../utils/emojis.utils.js'

const BOTNAME = "Shan'bot"

export const emoteOnMention = (message, state) => {
	const { user } = state

	if (
		message.content.toLowerCase().includes(BOTNAME.toLowerCase()) ||
		(user != null && message.mentions.has(user))
	) {
		const emoji = findEmoji('duh', message)
		if (emoji) {
			message.react(emoji)
		}
	}
}
