import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { clientId, guildId, token } from './config.json'
import { help, prune } from './commands'

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

const rest = new REST({ version: '9' }).setToken(token)

const route = globalDeploy
	? Routes.applicationCommands(clientId)
	: Routes.applicationGuildCommands(clientId, guildId)

rest
	.put(route, { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error)
