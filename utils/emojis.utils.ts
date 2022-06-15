import { Message } from 'discord.js'
import { EmojiKey } from '../model'

export const EMOJI_REGEX = /<:\w+:\d+>/

export const findEmoji = (name: string, message: Message) => {
	const emoji = message.guild?.emojis.cache.find(
		(emoji) => emoji.name?.toLowerCase() == name.toLowerCase(),
	)
	if (emoji) {
		return emoji
	} else {
		console.error(`Unable to find ${name} emoji`)
	}
}

export const getEmojiName = (emoji: string) => {
	const splited = emoji.split(':')
	return splited.length > 2 ? (splited[1] as EmojiKey) : undefined
}
