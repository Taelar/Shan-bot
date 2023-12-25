import { SlashCommandBuilder } from '@discordjs/builders'
import { Command } from '../model'

export const prune: Command = {
	name: 'prune',
	description: 'Efface le nombre de message indiqué',
	permissions: ['MANAGE_MESSAGES'],
	generateCommand: function () {
		return new SlashCommandBuilder()
			.setName(this.name)
			.setDescription(this.description)
			.addIntegerOption((option) =>
				option
					.setName('amount')
					.setDescription('Nombre de messages à supprimer'),
			)
	},
	execute: (interaction) => {
		const amount = interaction.options.getInteger('amount')

		if (!amount) {
			return interaction.reply("Ce n'est pas un nombre valide.")
		} else if (amount < 1 || amount > 100) {
			return interaction.reply('un nombre entre 1 et 99 est requis')
		}

		if (interaction.channel?.type === 'GUILD_TEXT') {
			interaction.channel
				.bulkDelete(amount, true)
				.then((messages) => {
					console.info(`${messages.size} messages deleted`)
					interaction.reply({
						content: `${messages.size} messages supprimés`,
						ephemeral: true,
					})
				})
				.catch((err) => {
					console.error(err)
					interaction.channel?.send(
						'Il y a un probleme en voulant supprimer les messages!',
					)
				})
		}
	},
}
