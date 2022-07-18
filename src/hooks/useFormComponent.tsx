import React, { FC, RefObject, useCallback } from 'react'
import { FormErrorsShape, RegisteredField, FormFieldProps } from '../types'
import { BriefForm } from '../components'

export const useFormComponent = function <FormShape>(
  value: FormShape,
  errors: FormErrorsShape<FormShape>,
  onChange: (value: FormShape, errors: FormErrorsShape<FormShape>) => void,
  registeredFields: RefObject<{ [key in keyof FormShape]: RegisteredField<FormShape> }>,
  UIField: FC<FormFieldProps<any, any>>
) {
  const Form: FC = ({ children }) => {
    return (
      <BriefForm<FormShape>
        value={value}
        errors={errors}
        onChange={onChange}
        registeredFields={registeredFields}
        UIField={UIField}
      >
        {children}
      </BriefForm>
    )
  }

  return { Form }
}
