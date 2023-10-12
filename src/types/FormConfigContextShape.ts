import { FC } from 'react'
import { FormFieldProps } from '.'

export type FormConfigContextShape = {
  fieldRenderer: FC<FormFieldProps<any, any>>
  crashIfRequiredFieldDoesNotHaveValidator?: boolean
  skipFieldsValidationOnUserInput?: boolean
}
