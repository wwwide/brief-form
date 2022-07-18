import React, { useCallback } from 'react'
import { Field, FieldProps } from '../components'

export type UseFieldComponentReturnValue<FormShape> = {
  Field: <InputProps, ValueType extends FormShape[keyof FormShape]>(
    props: FieldProps<InputProps, ValueType, FormShape>
  ) => JSX.Element
}

export const useFieldComponent = function <FormShape>(): UseFieldComponentReturnValue<FormShape> {
  const Wrapped = useCallback(function <InputProps, ValueType extends FormShape[keyof FormShape]>(
    props: FieldProps<InputProps, ValueType, FormShape>
  ) {
    return <Field<FormShape, InputProps, ValueType> {...props} />
  },
  [])

  return { Field: Wrapped }
}
