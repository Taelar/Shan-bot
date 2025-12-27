import { writeFileSync } from 'fs'
import { CharacterQuotes, QuoteEntry } from '../../model'

type APIResponse = {
	name: string
	slug: string
	quotes: Array<string>
}

type APIListResponse = Array<APIResponse>

const API_CHARACTER = 'hubert'

export const updateOss117ApiQuotes = async (
	dirPath: string,
	sourceObject: CharacterQuotes,
) => {
	const response = await fetch(
		`https://api.oss117quotes.xyz/v1/character/${API_CHARACTER}`,
	)

	const body: APIListResponse = await response.json()

	const updatedQuotes: Array<QuoteEntry> =
		body.at(0)?.quotes.map((sentence) => {
			const existing = sourceObject.quotes.find(
				(item) => item.original === sentence,
			)

			return (
				existing ?? {
					custom: null,
					active: false,
					original: sentence,
				}
			)
		}) ?? []

	writeFileSync(
		`${dirPath}/${API_CHARACTER.toLowerCase()}.json`,
		JSON.stringify(updatedQuotes),
	)
}
