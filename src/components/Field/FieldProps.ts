import { ReactNode, ComponentType } from 'react'
import { FormInputProps } from '../../types'

export type $InputProps<T> = T extends ComponentType<infer Props> ? Props : never

export interface FieldProps<Input extends ComponentType<FormInputProps<any, any>>, FormShape, FieldOwnProps = unknown> {
  name: keyof FormShape
  required?: boolean
  error?: string
  label?: ReactNode
  input: Input
  validator?: (v: $InputProps<Input>['value'], f: FormShape) => string | undefined
  inputProps: $InputProps<Input>
  fieldProps?: FieldOwnProps
  triggerValidatorBy?: (keyof FormShape)[]
}
