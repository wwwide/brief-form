import React, { ReactElement } from 'react'
import { FormProps } from './FormProps'
import { FormContext } from '../../context'

export const Form = function <FormShape extends { [key: string]: any }>(props: FormProps<FormShape>): ReactElement {
  const {
    config: { value, errors, registeredFields, onChange },
    children,
    UIField
  } = props

  return (
    <FormContext.Provider
      value={{
        value,
        errors,
        onChange,
        UIField,
        registeredFields
      }}
    >
      {children}
    </FormContext.Provider>
  )
}
