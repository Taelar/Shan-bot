export type ArgsType<T> = T extends (...args: infer K) => void ? K : never

export const isDefined = (object: any | null | undefined) =>
	object !== undefined && object !== null
