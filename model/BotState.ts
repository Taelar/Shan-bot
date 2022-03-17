import { Message } from 'discord.js'

export interface BotState {
	lastMessage: Message | null
}
