import { Automation, AutomationRunner, EMOJI_KEYS } from '../../model'
import { findEmoji } from '../../utils/emojis.utils'
import { randInt } from '../../utils/random.utils'

const MAX_RAND = 300

const randomReactionRunner: AutomationRunner = (message, clientUser, state) => {
	const rand = randInt(0, MAX_RAND)
	if (rand === 0) {
		const emojiRand = randInt(0, EMOJI_KEYS.length)
		const chosenEmojiKey = EMOJI_KEYS[emojiRand]
		const chosenEmoji = findEmoji(chosenEmojiKey, message)
		if (chosenEmoji) {
			message.react(chosenEmoji)
		}
	}
}

export const randomReaction: Automation = {
	role: 'reaction',
	antiAffinities: [],
	runner: randomReactionRunner,
}
