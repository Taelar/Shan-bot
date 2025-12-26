import { EmojiKey } from './Emojis'

export type QuoteEntry = {
	custom: string | null
	active: boolean
	original: string
}

export type CharacterQuotes = {
	emoji: EmojiKey
	quotes: Array<QuoteEntry>
}
