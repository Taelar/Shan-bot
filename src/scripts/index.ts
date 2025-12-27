import {
	PERCEVAL_QUOTES,
	LEODAGAN_QUOTES,
} from '../automation/randomQuote/resources'
import { updateKaamelottApiQuotes } from './quotes/kaamelottApiQuotes'
import { updateOss117ApiQuotes } from './quotes/oss117ApiQuotes'

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

updateOss117ApiQuotes('src/automation/randomQuote/resources', LEODAGAN_QUOTES)
