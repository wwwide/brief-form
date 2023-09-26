import { FormErrorsShape } from './'

export type FormChangeHandler<FormShape> = (value: FormShape | undefined, errors: FormErrorsShape<FormShape>) => void
