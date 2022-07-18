import { FC, RefObject } from 'react'
import { FormErrorsShape, RegisteredField, FormFieldProps } from '../../types'

export interface BriefFormProps<FormShape> {
  value: FormShape
  errors: FormErrorsShape<FormShape>
  onChange: (value: FormShape, errors: FormErrorsShape<FormShape>) => void
  UIField: FC<FormFieldProps<any, any>>
  registeredFields: RefObject<{ [key in keyof FormShape]: RegisteredField<FormShape> }>
  children: any
}
