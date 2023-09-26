import { RefObject } from 'react'
import { FormErrorsShape, RegisteredField } from './'
import { FormChangeHandler } from './FormChangeHandler'

export type FormConfig<FormShape> = {
  value: FormShape
  errors: FormErrorsShape<FormShape>
  onChange: FormChangeHandler<FormShape>
  registeredFields: RefObject<{ [key in keyof FormShape]: RegisteredField<FormShape> }>
}
