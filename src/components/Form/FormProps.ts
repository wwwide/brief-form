import { FC } from 'react'
import { FormConfig, FormFieldProps } from '../../types'

export interface FormProps<FormShape> {
  config: FormConfig<FormShape>
  fieldRenderer?: FC<FormFieldProps<any, any>>
  children?: any
}
