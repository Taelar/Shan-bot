const emoteUtils = require('../utils/emojis.utils')

module.exports = {
	execute(message, state) {
		const { content, author } = message
		const { lastMessage } = state
		if (
			content.match(emoteUtils.regex) &&
			content == lastMessage.content &&
			author.id != lastMessage.author.id
		) {
			const emojiName = content.split(':')[1]
			let answer
			switch (emojiName.toLowerCase()) {
				case 'sebastian':
					const emoji = emoteUtils.find('sebastian', message)
					answer = `${emoji} **Colo'shan synchronisée** ${emoji}`
					break
				default:
					answer = content
			}

			state.lastMessage = ''
			message.channel.send(answer)
		}
	},
}
