import { Command } from '../model'
import { SlashCommandBuilder } from '@discordjs/builders'

export const gne: Command = {
	name: 'gne',
	description: 'Test command',
	permissions: [],
	isTestCommand: true,
	generateCommand: function () {
		return new SlashCommandBuilder()
			.setName(this.name)
			.setDescription(this.description)
	},
	execute: (interaction) => {
		return interaction.channel?.send('https://tenor.com/bU83J.gif')
	},
}
