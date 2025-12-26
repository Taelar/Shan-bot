import {
	dualEmojis,
	randomQuote,
	pingpongEmojis,
	emoteOnMention,
	randomReaction,
	triggerWords,
} from '../automation'
import { Automation, AutomationRunner } from '../model'

// Todo : anti-affinité : dual emojis & pingpong & randomQuotes
const automationFunctions: Automation[] = [
	randomReaction,
	emoteOnMention,
	triggerWords,
	dualEmojis,
	randomQuote,
	pingpongEmojis,
]

export const onMessage: AutomationRunner = (message, clientUser, state) => {
	if (message.member?.user.bot) return

	automationFunctions.forEach((aut) => aut.runner(message, clientUser, state))
	state.lastMessage = message
}
