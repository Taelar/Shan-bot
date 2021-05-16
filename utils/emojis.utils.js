export const EMOJI_REGEX = /<:\w+:\d+>/

export const findEmoji = (name, message) =>
	message.guild.emojis.cache.find(
		(emoji) => emoji.name.toLowerCase() == name.toLowerCase(),
	)

export const getEmojiName = (emoji) => emoji.split(':')[1].toLowerCase()
