import {
	dualEmojis,
	randomQuote,
	pingpongEmojis,
	emoteOnMention,
	randomReaction,
	triggerWords,
} from '../automation'
import { Automation, AutomationRole, AutomationRunner } from '../model'

const automationFunctions: Automation[] = [
	randomReaction,
	emoteOnMention,
	triggerWords,
	dualEmojis,
	randomQuote,
	pingpongEmojis,
]

export const onMessage: (...args: Parameters<AutomationRunner>) => void = (
	message,
	clientUser,
	state,
) => {
	if (message.member?.user.bot) return

	const activeAutomations: Set<AutomationRole> = new Set()
	automationFunctions.forEach(({ runner, role, antiAffinities }) => {
		if (
			antiAffinities.find((antiAffinity) => activeAutomations.has(antiAffinity))
		)
			return

		const hasPerfomedAnAction = runner(message, clientUser, state)
		if (hasPerfomedAnAction) {
			activeAutomations.add(role)
		}
	})

	state.lastMessage = message
}
