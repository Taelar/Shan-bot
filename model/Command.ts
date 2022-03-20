import { CommandInteraction, PermissionFlags } from 'discord.js'

export interface Command {
	name: string
	description: string
	permissions: Array<keyof PermissionFlags>
	options: { [key in string]: string }
	execute: (interaction: CommandInteraction) => void
}
