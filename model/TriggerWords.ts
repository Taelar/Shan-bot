import { EmojiKey } from './Emojis'

export const TRIGGER_WORDS = ['swede', 'anduin'] as const

export type TriggerWordsKey = typeof TRIGGER_WORDS[number]

export interface TriggerWordsQuote {
	quote: string
	emoji: EmojiKey
}
