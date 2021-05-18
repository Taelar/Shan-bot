import { dualEmojisAutomation } from './dual_emojis.js'
import { percevalAutomation } from './perceval.js'
import { pingpongEmojis } from './pingpong_emojis.js'

const automationFunctions = [
	dualEmojisAutomation,
	percevalAutomation,
	pingpongEmojis,
]

export const automations = (message, state) =>
	automationFunctions.forEach((aut) => aut(message, state))
