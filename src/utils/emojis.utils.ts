import { Collection, Emoji, GuildEmoji, Message } from 'discord.js'
import { EMOJI_KEYS, EmojiKey } from '../model'

export const EMOJI_NAME_REGEX = /<(?<animated>a?):(?<name>\w+):(?<id>\d+)>/
export const EMOJI_REGEX = new RegExp(
	EMOJI_NAME_REGEX.source,
	EMOJI_NAME_REGEX.flags + 'g',
)

/** @deprecated Use getEmoji */
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

export const getEmoji = (
	name: string,
	emojiList: Collection<string, GuildEmoji>,
) => {
	const emoji = emojiList.find(
		(emoji) => emoji.name?.toLowerCase() == name.toLowerCase(),
	)

	return emoji
}

export const getEmojiName = (emoji: string): EmojiKey | undefined => {
	const matched = emoji.match(EMOJI_NAME_REGEX)
	const nameMatch = matched?.at(2)

	return nameMatch ? (nameMatch as EmojiKey) : undefined
}

export const isKnownEmoji = (emojiName: string): emojiName is EmojiKey =>
	(EMOJI_KEYS as ReadonlyArray<string>).includes(emojiName)

export const extractEmojis = (
	input: string,
	emojiList: Collection<string, GuildEmoji>,
) => {
	const matches = input.matchAll(EMOJI_REGEX)
	const names: Set<GuildEmoji> = new Set()

	for (const match of matches) {
		const matchName = match.groups?.['name']
		if (!matchName) continue

		const emoji = getEmoji(matchName, emojiList)
		if (!emoji) continue

		names.add(emoji)
	}

	return [...names]
}
