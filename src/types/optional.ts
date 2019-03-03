export type Optional<T extends object, TProps> =
  {[P in keyof T]: P extends TProps ? (T[P] | undefined) : T[P]}
