import { help } from '../commands/help'
import { prune } from '../commands/prune'
import { CommandInteraction } from 'discord.js'

export const activatedCommands = [help, prune]

export const onCommand = (interaction: CommandInteraction) => {
	if (interaction.user.bot) return
	const { commandName } = interaction

	const command = activatedCommands.find(({ name }) => name === commandName)

	if (!command) return

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
		interaction.reply('Il y a eu un soucis en voulant executer cette commande	')
	}
}
