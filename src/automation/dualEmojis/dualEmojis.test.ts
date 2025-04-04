import { expect, test } from 'vitest'
import { dualEmojiProcessor } from './dualEmojis.automation'
import { MOCK_EMOJI_COLLECTION } from '../../test/emojis.mock'
import { DUAL_EMOJIS_QUOTES } from './dualEmojis.resources'

test.each([
	{
		title: 'Basic case',
		lastMessage: '<:waf:111>',
		currentMessage: '<:waf:111>',
	},
	{
		title: 'Animated emoji',
		lastMessage: '<a:waf:111>',
		currentMessage: '<a:waf:111>',
	},
	{
		title: 'Basic case with text',
		lastMessage: 'wazo <:waf:111>',
		currentMessage: '<:waf:111> wazo',
	},
	{
		title: 'Multiple emojis',
		lastMessage: '<:waf:111> <:AH:222>',
		currentMessage: '<:waf:111> <:AH:222>',
	},
])('Dual emoji valid case : $title', ({ lastMessage, currentMessage }) => {
	const result = dualEmojiProcessor(
		lastMessage,
		currentMessage,
		MOCK_EMOJI_COLLECTION,
		DUAL_EMOJIS_QUOTES,
	)
	expect(result).toBeTypeOf('string')
	expect(result?.length).toBeGreaterThan(0)
})

test.each([
	{
		title: 'Raw text emoji',
		lastMessage: 'waf',
		currentMessage: 'waf',
	},
	{
		title: 'Emoji in last but not current',
		lastMessage: '<a:waf:111>',
		currentMessage: 'Wazo',
	},
	{
		title: 'Emoji in current but not last',
		lastMessage: 'Wazo',
		currentMessage: '<:waf:111>',
	},
	{
		title: 'Differents emojis',
		lastMessage: '<:AH:222>',
		currentMessage: '<:waf:111>',
	},
])('Dual emoji error case : $title', ({ lastMessage, currentMessage }) => {
	const result = dualEmojiProcessor(
		lastMessage,
		currentMessage,
		MOCK_EMOJI_COLLECTION,
		DUAL_EMOJIS_QUOTES,
	)
	expect(result).toBeUndefined()
})
