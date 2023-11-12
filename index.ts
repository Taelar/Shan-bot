import { Client, Intents } from 'discord.js'
import { onMessage } from './src/events/onMessage'
import { onCommand } from './src/events/onCommand'
import { BotState } from './src/model/BotState'

// Init

const client = new Client({
	partials: ['USER', 'MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER'],
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.DIRECT_MESSAGES,
	],
})

const state: BotState = {
	lastMessage: null,
	coolDowns: {
		triggerWords: null,
	},
}

// Events

client.once('ready', () => {
	client.user?.setActivity(`vos conversations débiles (/help)`, {
		type: 'WATCHING',
	})
	console.log('Server Started & ready !')
})

client.on('messageCreate', (message) => {
	if (client.user === null) return

	onMessage(message, client.user, state)
	console.log(message.content)
})

client.on('interactionCreate', (interaction) => {
	if (!interaction.isCommand()) return
	onCommand(interaction)
})

if (!process.env.TOKEN) {
	throw new Error('TOKEN is empty')
}

client.login(process.env.TOKEN)
