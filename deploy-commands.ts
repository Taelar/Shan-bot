import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { help, prune } from './src/commands'

const { CLIENT_ID, GUILD_ID, TOKEN } = process.env

if (TOKEN && CLIENT_ID && GUILD_ID) {
	const arg2 = process.argv[3]
	const globalDeploy = arg2.split('=').at(1) === 'true'

	const commands = [
		new SlashCommandBuilder()
			.setName(prune.name)
			.setDescription(prune.description)
			.addIntegerOption((option) =>
				option.setName('amount').setDescription(prune.options.amount),
			),
		new SlashCommandBuilder()
			.setName(help.name)
			.setDescription(help.description)
			.addStringOption((option) =>
				option.setName('command').setDescription(help.options.command),
			),
	].map((cmd) => cmd.toJSON())

	const rest = new REST({ version: '9' }).setToken(TOKEN)

	const route = globalDeploy
		? Routes.applicationCommands(CLIENT_ID)
		: Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)

	rest
		.put(route, { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error)
}
