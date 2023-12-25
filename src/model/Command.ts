import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction, PermissionFlags } from 'discord.js'

export interface Command {
	name: string
	description: string
	permissions: Array<keyof PermissionFlags>
	isTestCommand?: boolean
	generateCommand: () => Omit<
		SlashCommandBuilder,
		'addSubcommandGroup' | 'addSubcommand'
	>
	execute: (interaction: CommandInteraction) => void
}
