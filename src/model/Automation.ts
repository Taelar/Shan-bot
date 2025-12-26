import { ClientUser, Message } from 'discord.js'
import { BotState } from './BotState'

export type AutomationRole = 'message' | 'reaction'

/**
 * The core logic of an Automation
 * @param message The message that was just sent
 * @param clientUser The clientUser used by the bot
 * @param state The bot current state
 * @returns boolean Whether the automation performed an action or not
 */
export type AutomationRunner = (
	message: Message,
	clientUser: ClientUser,
	state: BotState,
) => boolean | undefined

/**
 * An Automation is a function that runs every time a message is sent on a watched
 * text channel. It can, for example, send a message in response or add emoji reactions.
 * An Automation is not a command handler, as its behavior is mostly random and does not
 * serve a functional purpose.
 */
export type Automation = {
	/** The core logic of the Automation */
	runner: AutomationRunner

	/** The role of the automation, used to compute anti-affinities with other automations */
	role: AutomationRole

	/** Roles that should not be executed if this automation performs an action */
	antiAffinities: Array<AutomationRole>
}
