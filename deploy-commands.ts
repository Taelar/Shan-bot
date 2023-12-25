import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { help, prune, duh } from './src/commands'
import { activatedCommands } from './src/events/onCommand'
import { isDefined } from './src/utils/types.utils'

const { CLIENT_ID, GUILD_ID, TOKEN } = process.env

const arg2 = process.argv[3]
const globalDeploy = arg2.split('=').at(1) === 'true'

if (!(TOKEN && CLIENT_ID && GUILD_ID)) {
	throw new Error('Can not load env var')
}

const commands = activatedCommands
	.map(({ isTestCommand, command }) =>
		isTestCommand && globalDeploy ? null : command.toJSON(),
	)
	.filter(isDefined)

const rest = new REST({ version: '9' }).setToken(TOKEN)

const route = globalDeploy
	? Routes.applicationCommands(CLIENT_ID)
	: Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)

rest
	.put(route, { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error)
