import {
	dualEmojisAutomation,
	percevalAutomation,
	pingpongEmojis,
	emoteOnMention,
} from '../automation'
import { Automation } from '../model'

const automationFunctions: Automation[] = [
	dualEmojisAutomation,
	percevalAutomation,
	pingpongEmojis,
	emoteOnMention,
]

export const onMessage: Automation = (message, clientUser, state) => {
	if (message.member?.user.bot) return

	automationFunctions.forEach((aut) => aut(message, clientUser, state))
	state.lastMessage = message
}
