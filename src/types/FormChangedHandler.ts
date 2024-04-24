import { FormErrorsShape } from './'

export type FormChangedHandler<FormShape> = (
  value: FormShape,
  errors: FormErrorsShape<FormShape>,
  updatedKeys: (keyof FormShape)[]
) => void
