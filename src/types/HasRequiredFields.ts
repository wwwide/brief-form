/**
 * This generic type gets all required keys from type T.
 */
type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K }[keyof T]

/**
 * This generic type became true or false depending on whether
 * type T has required keys or not.
 * NOTE: for now this type is unused because i couldn't find a proper way to use it
 * in FieldProps.ts. It requires chain of infering types, which I don't know how to
 * describe.
 */
export type HasRequiredFields<T> = RequiredKeys<T> extends never ? false : true
