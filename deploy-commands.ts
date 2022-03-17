import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { clientId, guildId, token } from './config.json'
import { help, prune } from './commands'

const commands = [
	new SlashCommandBuilder()
		.setName(prune.name)
		.setDescription(prune.description)
		.addIntegerOption((option) =>
			option.setName('amount').setDescription(prune.options.amount),
	),
	new SlashCommandBuilder().setName(help.name).setDescription(help.description).addStringOption(option => option.setName('command').setDescription(help.options.command))
].map((cmd) => cmd.toJSON())

const rest = new REST({ version: '9' }).setToken(token)

rest
	.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error)

// Pour activer les commandes globalement (Met jusqu'à 1h d'update, pas recommandé en dev)
// https://discordjs.guide/interactions/slash-commands.html#guild-commands
// .put(Routes.applicationCommands(clientId), { body: commands })
