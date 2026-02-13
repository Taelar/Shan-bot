/** Rand entre min (inclus) et max (inclus) */
export const randInt = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1) + min)
