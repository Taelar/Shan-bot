import { Collection, GuildEmoji } from 'discord.js'
import { EMOJI_KEYS } from '../model'

const mockEmojiCollection = (
	keys: Array<string>,
): Collection<string, GuildEmoji> => {
	const map = new Map<string, GuildEmoji>()

	keys.forEach((key) => {
		map.set(key, { name: key } as GuildEmoji)
	})

	return new Collection(map)
}

export const MOCK_EMOJI_COLLECTION = mockEmojiCollection(Array.from(EMOJI_KEYS))
