import { ComponentType, ReactElement } from 'react'
import { FormConfig } from './FormConfig'
import { FormSetValueFunction } from './FormSetValueFunction'
import { FormValidateFunction } from './FormValidateFunction'
import { FormInputProps } from './FormInputProps'
import { FormProps } from '../components/Form'
import { FieldProps } from '../components/Field'

export type UseFormDataReturnType<FormShape, FieldOpts = unknown> = {
  config: FormConfig<FormShape>
  isDirty: boolean
  isValid: boolean
  validity: number
  validate: FormValidateFunction<FormShape>
  set: FormSetValueFunction<FormShape>
  Form: <FormShape extends { [key: string]: any }>(props: FormProps<FormShape>) => ReactElement
  Field: <Input extends ComponentType<FormInputProps<any, any>>>(
    props: FieldProps<Input, FormShape, FieldOpts>
  ) => JSX.Element
}
