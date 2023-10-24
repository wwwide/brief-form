import { FC, ReactNode } from 'react'
import { FieldRendererProps } from '../../types'

export interface FormProviderProps {
  fieldRenderer: FC<FieldRendererProps<any, any, any>>
  crashIfRequiredFieldDoesNotHaveValidator?: boolean
  skipFieldsValidationOnUserInput?: boolean
  alwaysSyncWithInitialValueAndErrors?: boolean
  children?: ReactNode
}
