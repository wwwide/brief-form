import React, { ComponentType, useCallback } from 'react'
import { FormInputProps } from '../types'
import { Field, FieldProps } from '../components'

export type UseFieldComponentReturnValue<FormShape, FieldOwnProps> = {
  Field: <Input extends ComponentType<FormInputProps<any, any>>>(
    props: FieldProps<Input, FormShape, FieldOwnProps>
  ) => JSX.Element
}

export const useFieldComponent = function <FormShape extends object, FieldOwnProps>(): UseFieldComponentReturnValue<
  FormShape,
  FieldOwnProps
> {
  const Wrapped = useCallback(function <Input extends ComponentType<FormInputProps<any, any> & Record<string, any>>>(
    props: FieldProps<Input, FormShape, FieldOwnProps>
  ) {
    return <Field<FormShape, Input, FieldOwnProps> {...props} />
  },
  [])

  return { Field: Wrapped }
}
