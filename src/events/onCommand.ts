import { gne, help, prune } from '../commands'
import { CommandInteraction } from 'discord.js'

export const activatedCommands = [help, prune, gne]

export const onCommand = async (interaction: CommandInteraction) => {
	if (interaction.user.bot) {
		return
	}
	const { commandName } = interaction

	const command = activatedCommands.find(({ name }) => name === commandName)

	if (!command) {
		return
	}

	if (command.permissions) {
		if (!interaction.memberPermissions?.has(command.permissions)) {
			return interaction.reply(
				"Tu n'as pas les droits suffisant pour effectuer cette commande",
			)
		}
	}

	try {
		command.execute(interaction)
	} catch (error) {
		console.error(error)
		await interaction.reply(
			'Il y a eu un soucis en voulant executer cette commande	',
		)
	}
}
