import { expect, test } from 'vitest'
import { triggerWordsProcessor } from './triggerWords.automation'
import { MOCK_EMOJI_COLLECTION } from '../../test/emojis.mock'

test.each([
	{ title: 'Basic trigger', message: 'swedish', cooldown: null },
	{
		title: 'Basic trigger in text',
		message: 'im gonna build a parking',
		cooldown: null,
	},
])('Trigger words : $title', ({ message, cooldown }) => {
	const result = triggerWordsProcessor(message, cooldown, MOCK_EMOJI_COLLECTION)

	expect(result).toBeTypeOf('string')
	expect(result?.length).toBeGreaterThan(0)
})

test('Trigger word cooldown should prevent trigger when recent', () => {
	const cooldown = new Date()
	const result = triggerWordsProcessor(
		'swedish',
		cooldown,
		MOCK_EMOJI_COLLECTION,
	)

	expect(result).toBeUndefined()
})

test('Trigger word cooldown should allow trigger when old enough', () => {
	const cooldown = new Date('2000-01-01')
	const result = triggerWordsProcessor(
		'swedish',
		cooldown,
		MOCK_EMOJI_COLLECTION,
	)

	expect(result).toBeTypeOf('string')
	expect(result?.length).toBeGreaterThan(0)
})
