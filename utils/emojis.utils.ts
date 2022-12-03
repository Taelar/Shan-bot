import { Message } from 'discord.js'
import { EmojiKey } from '../model'

export const EMOJI_REGEX = /<(a?):(\w+):\d+>/

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

export const getEmojiName = (emoji: string): EmojiKey | undefined => {
	const matched = emoji.match(EMOJI_REGEX)
	const nameMatch = matched?.at(2)

	return nameMatch ? (nameMatch as EmojiKey) : undefined
}
