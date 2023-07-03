import { ClientUser, Message } from 'discord.js'
import { BotState } from './BotState'

export type Automation = (
	message: Message,
	clientUser: ClientUser,
	state: BotState,
) => void
