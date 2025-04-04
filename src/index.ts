import { Client, Intents } from 'discord.js'
import { onMessage } from './events/onMessage'
import { onCommand } from './events/onCommand'
import { BotState } from './model/BotState'
import { devModeLog } from './utils/function.utils'

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
	devModeLog('Dev mode is active')
})

client.on('messageCreate', (message) => {
	if (client.user === null) return

	onMessage(message, client.user, state)
	devModeLog(message.content)
})

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) {
		return
	}
	await onCommand(interaction)
})

if (!process.env.TOKEN) {
	throw new Error('TOKEN is empty')
}

client.login(process.env.TOKEN)
