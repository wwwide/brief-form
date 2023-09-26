import { FormErrorsShape } from './'

export type FormChangedHandler<FormShape> = (value: FormShape, errors: FormErrorsShape<FormShape>) => void
