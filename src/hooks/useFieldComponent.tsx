import React, { ComponentType, useCallback } from 'react'
import { FormInputProps } from '../types'
import { Field, FieldProps } from '../components'

export type UseFieldComponentReturnValue<FormShape> = {
  Field: <Input extends ComponentType<FormInputProps<any, any>>>(
    props: FieldProps<Input, FormShape>
  ) => JSX.Element
}

export const useFieldComponent = function <FormShape>(): UseFieldComponentReturnValue<FormShape> {
  const Wrapped = useCallback(function <Input extends ComponentType<(FormInputProps<any, any> & Record<string, any>)>>(
    props: FieldProps<Input, FormShape>
  ) {
    return <Field<FormShape, Input> {...props} />
  },
  [])

  return { Field: Wrapped }
}
