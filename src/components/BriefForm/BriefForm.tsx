import React, { ReactElement } from 'react'
import { BriefFormProps } from './BriefFormProps'
import { BriefFormContext } from '../../context'

export const BriefForm = function <FormShape extends { [key: string]: any }>(
  props: BriefFormProps<FormShape>
): ReactElement {
  const {
    config: { value, errors, registeredFields, onChange },
    children,
    UIField
  } = props

  return (
    <BriefFormContext.Provider
      value={{
        value,
        errors,
        onChange,
        UIField,
        registeredFields
      }}
    >
      {children}
    </BriefFormContext.Provider>
  )
}
