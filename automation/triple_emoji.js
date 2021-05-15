const emoteUtils = require('../utils/emotes.utils')

module.exports = {
	execute(message, state) {
		const { content, author } = message
		const { lastMessage } = state
		if (
			content.match(emoteUtils.regex) &&
			content == lastMessage.content &&
			author.id != lastMessage.author.id
		) {
			message.channel.send(content)
			state.lastMessage = ''
		}
	},
}
