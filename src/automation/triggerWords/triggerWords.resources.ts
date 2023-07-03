import { TriggerWordsKey, TriggerWordsQuote } from './triggerWords.model'

export const TRIGGER_WORDS_MAPPING: { [key in TriggerWordsKey]: string[] } = {
	swede: ['suedois', 'suede', 'suedie', 'swedish', 'swede', 'bjark', 'parking'],
	anduin: ['anduin', 'varian', 'wrynn'],
}

export const TRIGGER_WORDS_QUOTES: {
	[key in TriggerWordsKey]: TriggerWordsQuote[]
} = {
	swede: [
		{ quote: 'Suédois de ses morts', emoji: 'diggy' },
		{ quote: 'Encore un ptn de suédois', emoji: 'diggy' },
		{ quote: 'You want a fucking war, Swede ?', emoji: 'diggy' },
		{
			quote: 'Ça rigolera moins avec un parking dans la gueule',
			emoji: 'diggy',
		},
	],
	anduin: [
		{ quote: 'ANDUIN', emoji: 'CuteAnduin' },
		{ quote: 'VARIAN C LE PER DANDUIN', emoji: 'DeterAnduin' },
	],
}
