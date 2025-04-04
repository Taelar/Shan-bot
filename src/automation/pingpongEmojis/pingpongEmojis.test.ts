import { expect, test } from 'vitest'
import { MOCK_EMOJI_COLLECTION } from '../../test/emojis.mock'
import { PINGPONG_EMOJIS_QUOTES } from './pingpongEmojis.resources'
import { pingpongEmojisProcessor } from './pingpongEmojis.automation'

test('Ping pong emoji match case', () => {
	const result = pingpongEmojisProcessor(
		'<:waf:111>',
		'<:wafreverse:222>',
		MOCK_EMOJI_COLLECTION,
		PINGPONG_EMOJIS_QUOTES,
	)

	expect(result).toBeTypeOf('string')
	expect(result?.length).toBeGreaterThan(0)
})

test('Ping pong emoji should not match the same emoji twice', () => {
	const result = pingpongEmojisProcessor(
		'<:waf:111>',
		'<:waf:222>',
		MOCK_EMOJI_COLLECTION,
		PINGPONG_EMOJIS_QUOTES,
	)

	expect(result).toBeUndefined()
})

test('Ping pong emoji should not match two different emojis with no match', () => {
	const result = pingpongEmojisProcessor(
		'<:dogeing:111>',
		'<:waf:222>',
		MOCK_EMOJI_COLLECTION,
		PINGPONG_EMOJIS_QUOTES,
	)

	expect(result).toBeUndefined()
})
