export type ArgsType<T> = T extends (...args: infer K) => void ? K : never

export type ValuesOf<T> = T extends { [key in string]: infer R } ? R : never

export const isDefined = <T>(object: T | null | undefined): object is T =>
	object !== undefined && object !== null
