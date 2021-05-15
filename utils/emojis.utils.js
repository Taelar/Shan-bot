module.exports = {
	regex: /<:\w+:\d+>/,
	find(name, message) {
		return message.guild.emojis.cache.find(
			(emoji) => emoji.name.toLowerCase() == name.toLowerCase(),
		)
	},
}
