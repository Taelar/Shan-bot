import { Message } from 'discord.js'
import { EmojiKey } from '../model/Emojis'

export const EMOJI_REGEX = /<:\w+:\d+>/

export const findEmoji = (name: string, message: Message) =>
	message.guild?.emojis.cache.find(
		(emoji) => emoji.name?.toLowerCase() == name.toLowerCase(),
	)

export const getEmojiName = (emoji: string) => {
	const splited = emoji.split(':')
	return splited.length > 2 ? (splited[1] as EmojiKey) : undefined
}
