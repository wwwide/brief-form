import { FC, ReactNode } from 'react'
import { FormFieldProps } from '../../types'

export interface FormProviderProps {
  fieldRenderer: FC<FormFieldProps<any, any>>
  crashIfRequiredFieldDoesNotHaveValidator?: boolean
  children?: ReactNode
}
