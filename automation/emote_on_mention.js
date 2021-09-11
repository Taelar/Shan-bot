import { findEmoji } from './../utils/emojis.utils.js'

const BOTNAME = "Shan'bot"

export const emoteOnMention = (message, state) => {
	if (message.content.toLowerCase().includes(BOTNAME.toLowerCase())) {
		const emoji = findEmoji('duh', message)
		message.react(emoji)
	}
}
