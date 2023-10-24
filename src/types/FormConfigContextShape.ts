import { FC } from 'react'
import { FieldRendererProps } from './FieldRendererProps'

export type FormConfigContextShape = {
  fieldRenderer: FC<FieldRendererProps<any, any, any>>
  crashIfRequiredFieldDoesNotHaveValidator?: boolean
  skipFieldsValidationOnUserInput?: boolean
  alwaysSyncWithInitialValueAndErrors?: boolean
}
