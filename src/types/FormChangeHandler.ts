import { FormErrorsShape } from './'

export type FormChangeHandler<FormShape> = (value: FormShape, errors: FormErrorsShape<FormShape>) => void
