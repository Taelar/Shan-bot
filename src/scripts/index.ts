import {
	PERCEVAL_QUOTES,
	LEODAGAN_QUOTES,
} from '../automation/randomQuote/resources'
import { updateKaamelottApiQuotes } from './quotes/kaamelottApiQuotes'

updateKaamelottApiQuotes(
	'Perceval',
	'src/automation/randomQuote/resources',
	PERCEVAL_QUOTES,
)

updateKaamelottApiQuotes(
	'Léodagan',
	'src/automation/randomQuote/resources',
	LEODAGAN_QUOTES,
)
