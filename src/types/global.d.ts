export {}

declare global {
	type SafeOmit<T, K extends keyof T> = Omit<T, K>
}
