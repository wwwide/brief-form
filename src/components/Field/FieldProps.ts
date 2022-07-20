import { FC, ReactNode } from 'react'
import { FormInputProps } from '../../types'

export interface FieldProps<InputProps, ValueType, FormShape> {
  name: keyof FormShape
  required?: boolean
  error?: string
  label?: ReactNode
  input: FC<FormInputProps<ValueType> & InputProps>
  validator?: (v: ValueType, f: FormShape) => string | undefined
  inputProps?: InputProps
}
