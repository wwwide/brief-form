import React, { FC } from 'react'
import { FormFieldProps, BriefFormConfig } from '../types'
import { BriefForm } from '../components'

export const useFormComponent = function <FormShape>(
  config: BriefFormConfig<FormShape>,
  UIField: FC<FormFieldProps<any, any>>
): { Form: FC } {
  const Form: FC = ({ children }) => {
    return (
      <BriefForm<FormShape> config={config} UIField={UIField}>
        {children}
      </BriefForm>
    )
  }

  return { Form }
}
