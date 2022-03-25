import { Automation } from '../model/Automation'
import { findEmoji } from '../utils/emojis.utils'

const BOTNAME = "Shan'bot"

export const emoteOnMention: Automation = (message, clientUser, state) => {
	if (
		message.content.toLowerCase().includes(BOTNAME.toLowerCase()) ||
		message.mentions.has(clientUser)
	) {
		const emoji = findEmoji('duh', message)
		if (emoji) {
			message.react(emoji)
		}
	}
}
