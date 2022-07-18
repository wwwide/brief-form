import { RefObject } from 'react'
import { FormErrorsShape, RegisteredField } from '.'

export type FormConfig<FormShape> = {
  value: FormShape
  errors: FormErrorsShape<FormShape>
  onChange: (value: FormShape, errors: FormErrorsShape<FormShape>) => void
  registeredFields: RefObject<{ [key in keyof FormShape]: RegisteredField<FormShape> }>
}
