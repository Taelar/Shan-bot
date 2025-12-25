import { describe, expect, it } from 'vitest'
import { MOCK_EMOJI_COLLECTION } from '../../test/emojis.mock'
import { PINGPONG_EMOJIS_QUOTES } from './pingpongEmojis.resources'
import { pingpongEmojisProcessor } from './pingpongEmojis.automation'

describe('Pingpong Emojis', () => {
	it.each([
		{
			title: 'matches one way combination',
			lastMessage: '<:waf:111>',
			currentMessage: '<:wafreverse:222>',
		},
		{
			title: 'matches other way combination',
			lastMessage: '<:wafreverse:222>',
			currentMessage: '<:waf:111>',
		},
		{
			title: 'matches with mixed emojis',
			lastMessage: '<:duh:333><:wafreverse:222>',
			currentMessage: '<:waf:111><:ayaya:444>',
		},
	])('$title', ({ currentMessage, lastMessage }) => {
		const result = pingpongEmojisProcessor(
			lastMessage,
			currentMessage,
			MOCK_EMOJI_COLLECTION,
			PINGPONG_EMOJIS_QUOTES,
		)

		expect(result).toBeTypeOf('string')
		expect(result?.length).toBeGreaterThan(0)
	})

	it.each([
		{
			title: 'does not match same emoji',
			lastMessage: '<:waf:111>',
			currentMessage: '<:waf:222>',
		},
		{
			title: 'does not match wrong combination',
			lastMessage: '<:dogeing:222>',
			currentMessage: '<:waf:111>',
		},
	])('$title', ({ currentMessage, lastMessage }) => {
		const result = pingpongEmojisProcessor(
			lastMessage,
			currentMessage,
			MOCK_EMOJI_COLLECTION,
			PINGPONG_EMOJIS_QUOTES,
		)

		expect(result).toBeUndefined()
	})
})
