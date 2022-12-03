export type ArgsType<T> = T extends (...args: infer K) => void ? K : never

export type ValuesOf<T> = T extends { [key in string]: infer R } ? R : never

export const isDefined = (object: any | null | undefined) =>
	object !== undefined && object !== null
