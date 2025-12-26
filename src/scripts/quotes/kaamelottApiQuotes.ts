import { writeFileSync } from 'fs'
import { CharacterQuotes, QuoteEntry } from '../../model'
import { PERCEVAL_QUOTES } from '../../automation/randomQuote/resources/perceval.quotes'

type APIQuote = {
	citation: string
	infos: {
		auteur: string
		acteur: string
		personnage: string
		saison: string
		episode: string
	}
}

type APIListSuccessResponse = {
	status: 1
	citation: Array<APIQuote>
}

type APIErrorResponse = {
	status: 0
	code: number
	error: string
}

type APIListResponse = APIListSuccessResponse | APIErrorResponse

type APICharacter = 'Perceval' | 'é'

export const updateKaamelottApiQuotes = async (
	apiCharacter: APICharacter,
	dirPath: string,
	sourceObject: CharacterQuotes,
) => {
	const response = await fetch(
		`https://kaamelott.chaudie.re/api/all/personnage/${apiCharacter}`,
	)

	const body: APIListResponse = await response.json()

	if (body.status === 0) {
		throw new Error(`Error body recieved ${JSON.stringify(body)}`)
	}

	const updatedQuotes: Array<QuoteEntry> = body.citation.map(({ citation }) => {
		const existing = sourceObject.quotes.find(
			(item) => item.original === citation,
		)

		return (
			existing ?? {
				custom: null,
				active: false,
				original: citation,
			}
		)
	})

	writeFileSync(
		`${dirPath}/${apiCharacter.toLowerCase()}.json`,
		JSON.stringify(updatedQuotes),
	)
}
