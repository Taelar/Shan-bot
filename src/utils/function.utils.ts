export const IS_DEV_MODE_ACTIVE = process.env.DEV_MODE === 'true'

export const devModeLog = (content: string) => {
	if (IS_DEV_MODE_ACTIVE) {
		console.log(content)
	}
}
