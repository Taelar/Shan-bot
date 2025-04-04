import { IS_DEV_MODE_ACTIVE } from './function.utils'

export const isDifferentAuthor = (
	authorId: string,
	lastMessageAuthorId: string,
) => {
	return IS_DEV_MODE_ACTIVE || authorId !== lastMessageAuthorId
}
