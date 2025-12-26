import { TriggerWordsKey, TRIGGER_WORDS_COOLDOWN } from './triggerWords.model'
import {
	TRIGGER_WORDS_MAPPING,
	TRIGGER_WORDS_QUOTES,
} from './triggerWords.resources'
import { getEmoji } from '../../utils/emojis.utils'
import { randInt } from '../../utils/random.utils'
import { Automation, AutomationRunner } from '../../model'
import { Collection, GuildEmoji } from 'discord.js'

const triggerWordsRunner: AutomationRunner = (message, clientUser, state) => {
	const cooldown = state.coolDowns.triggerWords
	const emojiList = message.guild?.emojis.cache

	if (!emojiList) return

	const answer = triggerWordsProcessor(message.content, cooldown, emojiList)

	if (!answer) return

	message.channel.send(answer)
	state.coolDowns.triggerWords = new Date()
	return true
}

export const triggerWordsProcessor = (
	message: string,
	cooldown: Date | null,
	emojiList: Collection<string, GuildEmoji>,
) => {
	const isOnCooldown = cooldown
		? Date.now() - cooldown.getTime() < TRIGGER_WORDS_COOLDOWN
		: false
	if (isOnCooldown) return

	const foundTriggerEntry = Object.entries(TRIGGER_WORDS_MAPPING).find(
		([key, words]) =>
			words.find((word) => {
				const cleanedMessage = message
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.toLowerCase()
				return cleanedMessage.includes(word)
			}),
	)

	if (!foundTriggerEntry) return

	const triggerKey = foundTriggerEntry[0] as TriggerWordsKey
	const quotes = TRIGGER_WORDS_QUOTES[triggerKey]
	const quoteRand = randInt(0, quotes.length)
	const quoteEntry = quotes[quoteRand]

	if (!quoteEntry) return

	const emoji = getEmoji(quoteEntry.emoji, emojiList)
	return `${quoteEntry.quote} ${emoji}`
}

export const triggerWords: Automation = {
	role: 'message',
	antiAffinities: ['message'],
	runner: triggerWordsRunner,
}
