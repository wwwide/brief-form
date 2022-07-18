import React, { FC } from 'react'
import { FormFieldProps, FormConfig } from '../types'
import { Form as F } from '../components'

export const useFormComponent = function <FormShape>(
  config: FormConfig<FormShape>,
  UIField: FC<FormFieldProps<any, any>>
): { Form: FC } {
  const Form: FC = ({ children }) => {
    return (
      <F<FormShape> config={config} UIField={UIField}>
        {children}
      </F>
    )
  }

  return { Form }
}
