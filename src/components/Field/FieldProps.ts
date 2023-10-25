import { ReactNode, ComponentType } from 'react'
import { FormInputProps, BaseFormInputProps } from '../../types'

export type $InputProps<T> = T extends ComponentType<infer Props> ? Props : never

export interface FieldProps<Input extends ComponentType<FormInputProps<any, any>>, FormShape, FieldOwnProps = unknown> {
  name: keyof FormShape
  required?: boolean
  error?: string
  label?: ReactNode
  input: Input
  validator?: (v: $InputProps<Input>['value'], f: FormShape) => string | undefined
  inputProps: Omit<$InputProps<Input>, keyof BaseFormInputProps<any>>
  fieldProps?: FieldOwnProps
  triggerValidatorBy?: (keyof FormShape)[]
}
