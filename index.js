import fs from 'fs'
import { Client, Collection } from 'discord.js'
import { onMessage } from './events/onMessage.js'
import { activatedCommands } from './commands/commands.js'

// Init

const { prefix, token, messageId, availableRoles } = JSON.parse(
	fs.readFileSync('./config.json'),
)

const client = new Client({
	partials: ['USER', 'MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER'],
})
client.commands = new Collection()

activatedCommands.forEach((com) => client.commands.set(com.name, com))

const state = {
	cooldowns: new Collection(),
	lastMessage: {},
}

// Events

client.once('ready', () => {
	client.user.setActivity(`vos conversations débiles (${prefix}help)`, {
		type: 'WATCHING',
	})
	console.log('Server Started & ready !')
})

client.on('message', (message) => {
	onMessage(message, prefix, client, state)
	console.log(message.content)
})

client.on('messageReactionAdd', async (reaction, user) => {
	console.log('messageReactionAdd')
	console.log(reaction, user)
	if (!user) return
	if (user.bot) return
	if (!reaction.message.channel.guild) return
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch()
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error)
			// Return as `reaction.message.author` may be undefined/null
			return
		}
	}

	//Filter the reaction
	if (reaction.message.id === messageId) {
		for (let n in availableRoles) {
			if (reaction.emoji.name == availableRoles[n]) {
				const guild = reaction.message.guild

				const memberWhoReacted = guild.members.cache.find(
					(member) => member.id === user.id,
				)
				let role = reaction.message.guild.roles.cache.find(
					(r) => r.name == availableRoles[n],
				)
				memberWhoReacted.roles.add(role).catch(console.error)
			}
		}
	}
})

client.on('messageReactionRemove', async (reaction, user) => {
	console.log('messageReactionRemove')
	console.log(reaction, user)
	if (!user) return
	if (user.bot) return
	if (!reaction.message.channel.guild) return
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch()
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error)
			// Return as `reaction.message.author` may be undefined/null
			return
		}
	}

	//Filter the reaction
	if (reaction.message.id === messageId) {
		for (let n in availableRoles) {
			if (reaction.emoji.name == availableRoles[n]) {
				const guild = reaction.message.guild

				const memberWhoReacted = guild.members.cache.find(
					(member) => member.id === user.id,
				)
				let role = reaction.message.guild.roles.cache.find(
					(r) => r.name == availableRoles[n],
				)
				memberWhoReacted.roles.remove(role).catch(console.error)
			}
		}
	}
})

client.login(token)
