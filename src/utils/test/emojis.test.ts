import { expect, test } from 'vitest'
import { getEmoji, getEmojiName } from '../emojis.utils'
import { MOCK_EMOJI_COLLECTION } from '../../test/emojis.mock'

test.each([
	{
		title: 'Message only contains emoji',
		message: '<:Duh:111>',
		expected: 'Duh',
	},
	{
		title: 'Animated emoji',
		message: '<a:bear:5555>',
		expected: 'bear',
	},
	{ title: 'Message contains no emojis', message: 'wazo', expected: undefined },
	{
		title: 'Message contains emoji and text',
		message: 'wazo <:Duh:111>',
		expected: 'Duh',
	},
	{
		title: 'Message contains two emojis',
		message: '<:Duh:111> <:AH:222>',
		expected: 'Duh',
	},
])('Get emoji Name: $title', ({ message, expected }) => {
	const result = getEmojiName(message)
	expect(result).toBe(expected)
})

test.each([
	{
		title: 'Basic emoji',
		name: 'Duh',
		expected: 'Duh',
	},
	{ title: 'Unknown emoji', name: 'unknown', expected: undefined },
])('Get emoji : $title', ({ name, expected }) => {
	const result = getEmoji(name, MOCK_EMOJI_COLLECTION)
	expect(result?.name).toBe(expected)
})
