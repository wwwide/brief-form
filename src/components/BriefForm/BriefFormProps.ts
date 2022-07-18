import { FC } from 'react'
import { BriefFormConfig, FormFieldProps } from '../../types'

export interface BriefFormProps<FormShape> {
  config: BriefFormConfig<FormShape>
  UIField: FC<FormFieldProps<any, any>>
  children?: any
}
