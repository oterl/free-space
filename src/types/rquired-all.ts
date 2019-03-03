export type RquiredAll<T> = {[P in keyof T]: NonNullable<T[P]>}
