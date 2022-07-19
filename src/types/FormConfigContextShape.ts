import { FC, RefObject } from 'react'
import { FormErrorsShape } from './FormErrorsShape'
import { RegisteredField, FormFieldProps } from '.'

/**
 * Context used by form to get its flobal setup:
 * 1. fieldRenderer - component used to draw UI (label, input, error)
 */
export type FormConfigContextShape = {
  fieldRenderer: FC<FormFieldProps<any, any>>
  crashIfRequiredFieldDoesNotHaveValidator: boolean
}
