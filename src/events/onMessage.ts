import {
	dualEmojisAutomation,
	randomQuoteAutomation,
	pingpongEmojis,
	emoteOnMention,
	randomReaction,
	triggerWords,
} from '../automation'
import { Automation } from '../model'

// Todo : anti-affinité : dual emojis & pingpong & randomQuotes
const automationFunctions: Automation[] = [
	dualEmojisAutomation,
	randomQuoteAutomation,
	pingpongEmojis,
	emoteOnMention,
	randomReaction,
	triggerWords,
]

export const onMessage: Automation = (message, clientUser, state) => {
	if (message.member?.user.bot) return

	automationFunctions.forEach((aut) => aut(message, clientUser, state))
	state.lastMessage = message
}
