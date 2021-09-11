import { dualEmojisAutomation } from './dual_emojis.js'
import { percevalAutomation } from './perceval.js'
import { pingpongEmojis } from './pingpong_emojis.js'
import { emoteOnMention } from './emote_on_mention.js'

const automationFunctions = [
	dualEmojisAutomation,
	percevalAutomation,
	pingpongEmojis,
	emoteOnMention,
]

export const automations = (message, state) =>
	automationFunctions.forEach((aut) => aut(message, state))
