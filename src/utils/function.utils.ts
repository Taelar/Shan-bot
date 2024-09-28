export const IS_DEV_MODE_ACTIVE = process.env.DEV_MODE === 'true'

export const devModeLog = (...args: Array<string>) => {
	if (IS_DEV_MODE_ACTIVE) {
		console.info(...args)
	}
}
