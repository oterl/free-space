export type Rquired<T, TProps> =
  T extends object
    ? {[P in keyof T]: P extends TProps ? NonNullable<T[P]> : T[P]}
    : T
