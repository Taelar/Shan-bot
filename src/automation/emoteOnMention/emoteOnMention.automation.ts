import { Automation, AutomationRunner } from '../../model/Automation'
import { findEmoji } from '../../utils/emojis.utils'

const BOTNAME = "Shan'bot"
const EMOJI_NAME = 'paswar'

const emoteOnMentionRunner: AutomationRunner = (message, clientUser, state) => {
	if (
		message.content.toLowerCase().includes(BOTNAME.toLowerCase()) ||
		message.mentions.has(clientUser)
	) {
		const emoji = findEmoji(EMOJI_NAME, message)
		if (!emoji) return

		message.react(emoji)
		return true
	}
}

export const emoteOnMention: Automation = {
	role: 'reaction',
	antiAffinities: [],
	runner: emoteOnMentionRunner,
}
