import React, { ReactElement, useContext } from 'react'
import { FormProps } from './FormProps'
import { FormConfigContext, FormContext } from '../../context'

export const Form = function <FormShape extends { [key: string]: any }>(props: FormProps<FormShape>): ReactElement {
  const {
    config: { value, errors, registeredFields, onChange },
    fieldRenderer,
    children,
    name
  } = props
  const { fieldRenderer: GlobalField } = useContext(FormConfigContext)

  if (!fieldRenderer && GlobalField.name === 'fieldStub') {
    throw new Error('you should pass fieldRenderer prop to your Form or wrap your Form in FormProvider component')
  }

  return (
    <FormContext.Provider
      value={{
        value,
        errors,
        onChange,
        fieldRenderer: fieldRenderer || GlobalField,
        registeredFields,
        name: name || 'form'
      }}
    >
      {children}
    </FormContext.Provider>
  )
}
