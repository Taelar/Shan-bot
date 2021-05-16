import { dualEmojisAutomation } from './dual_emojis.js'
import { percevalAutomation } from './perceval.js'

const automationFunctions = [dualEmojisAutomation, percevalAutomation]

export const automations = (message, state) =>
	automationFunctions.forEach((aut) => aut(message, state))
