import { MessageEmbed } from 'discord.js'
import { Command } from '../model'
import { SlashCommandBuilder } from '@discordjs/builders'

const NAME = 'duh'
const DESC = 'Test command'
export const duh: Command = {
	name: NAME,
	description: DESC,
	permissions: [],
	isTestCommand: true,
	command: new SlashCommandBuilder().setName('duh').setDescription(DESC),
	execute: (interaction) => {
		return interaction.channel?.send('https://tenor.com/bU83J.gif')
	},
}
