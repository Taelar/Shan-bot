import { expect, test } from 'vitest'
import { extractEmojis, getEmoji, getEmojiName } from '../emojis.utils'
import { MOCK_EMOJI_COLLECTION } from '../../test/emojis.mock'

test.each([
	{
		title: 'Message only contains emoji',
		message: '<:waf:111>',
		expected: 'waf',
	},
	{
		title: 'Animated emoji',
		message: '<a:bear:5555>',
		expected: 'bear',
	},
	{ title: 'Message contains no emojis', message: 'wazo', expected: undefined },
	{
		title: 'Message contains emoji and text',
		message: 'wazo <:waf:111>',
		expected: 'waf',
	},
	{
		title: 'Message contains two emojis',
		message: '<:waf:111> <:AH:222>',
		expected: 'waf',
	},
])('Get emoji Name: $title', ({ message, expected }) => {
	const result = getEmojiName(message)
	expect(result).toBe(expected)
})

test.each([
	{
		title: 'Basic emoji',
		name: 'waf',
		expected: 'waf',
	},
	{ title: 'Unknown emoji', name: 'unknown', expected: undefined },
])('Get emoji : $title', ({ name, expected }) => {
	const result = getEmoji(name, MOCK_EMOJI_COLLECTION)
	expect(result?.name).toBe(expected)
})

test.each([
	{
		title: 'Message contains one emoji',
		message: '<:waf:111>',
		expected: ['waf'],
	},
	{
		title: 'Message contains multiple emojis',
		message: '<:waf:111> <:ui:222> <:iyaya:333>',
		expected: ['waf', 'ui', 'iyaya'],
	},
	{
		title: 'Message contains repeating emoji',
		message: '<:waf:111> <:waf:111> <:waf:111>',
		expected: ['waf'],
	},
	{
		title: 'Message contains repeating emojis',
		message: '<:waf:111> <:ui:222> <:waf:111> <:ui:222> <:ui:222>',
		expected: ['waf', 'ui'],
	},
	{
		title: 'Message contains repeating emojis and text',
		message:
			'lorem<:waf:111> ipsum <:ui:222> <:waf:111> sit dolor <:ui:222> <:ui:222> amet',
		expected: ['waf', 'ui'],
	},
])('extractEmojis : $title', ({ message, expected }) => {
	const result = extractEmojis(message, MOCK_EMOJI_COLLECTION)
	const resultNames = result.map(({ name }) => name)
	expect(resultNames).toEqual(expected)
})
