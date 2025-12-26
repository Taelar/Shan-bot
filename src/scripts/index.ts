import { PERCEVAL_QUOTES } from '../automation/randomQuote/resources/perceval.quotes'
import { updateKaamelottApiQuotes } from './quotes/kaamelottApiQuotes'

updateKaamelottApiQuotes(
	'Perceval',
	'src/automation/randomQuote/resources',
	PERCEVAL_QUOTES,
)
