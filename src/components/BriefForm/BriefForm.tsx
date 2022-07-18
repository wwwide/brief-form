import React from 'react'
import { BriefFormProps } from './BriefFormProps'
import { BriefFormContext } from '../../context'

export const BriefForm = function <FormShape extends { [key: string]: any }>(props: BriefFormProps<FormShape>) {
  const { value, errors, children, onChange, UIField, registeredFields } = props

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
