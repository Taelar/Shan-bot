import { SlashCommandBuilder } from '@discordjs/builders'
import { activatedCommands } from '../events/onCommand'
import { Command } from '../model'

export const help: Command = {
	name: 'help',
	description:
		"Liste toutes les commandes disponibles ou donne plus d'info sur une commande",
	permissions: [],
	generateCommand: function () {
		return new SlashCommandBuilder()
			.setName(this.name)
			.setDescription(this.description)
			.addStringOption((option) =>
				option.setName('command').setDescription('Une commande'),
			)
	},
	execute: (interaction) => {
		const data: string[] = []
		const requestedCommand = interaction.options.getString('command')

		if (!requestedCommand) {
			data.push('Voici la liste de toutes mes commandes disponibles:')
			data.push(
				activatedCommands.map((command) => `\`${command.name}\``).join(', '),
			)
			data.push(
				`\nTu peux utiliser \`/help [nom de commande]\` pour avoir plus d'information sur la commande!`,
			)

			return interaction.reply(data.join())
		}

		const actualCommand = activatedCommands.find(
			(command) => command.name === requestedCommand,
		)

		if (!actualCommand) {
			return interaction.reply('Je ne connais pas cette commande')
		}

		data.push(`**Nom:** ${actualCommand.name}`)

		if (actualCommand.description)
			data.push(`\n**Description:** ${actualCommand.description}`)

		interaction.reply(data.join())
	},
}
