import { EmojiKey } from '../../model'

export type PingPongDictionnary = Partial<
	Record<`${EmojiKey}/${EmojiKey}`, Array<string>>
>

export const PINGPONG_EMOJIS_QUOTES: PingPongDictionnary = {
	'waf/wafreverse': ['waf'],
	'point_gun/point_gun_reverse': ['Everyone shuts the fuck up'],
	'dogeing/catwhat': ['Oh les golmons'],
}
