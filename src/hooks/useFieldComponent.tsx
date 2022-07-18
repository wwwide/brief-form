import React, { useCallback } from 'react'
import { Field, FieldProps } from '../components'

export const useFieldComponent = function <FormShape>() {
  const Wrapped = useCallback(function <InputProps, ValueType extends FormShape[keyof FormShape]>(
    props: FieldProps<InputProps, ValueType, FormShape>
  ) {
    return <Field<FormShape, InputProps, ValueType> {...props} />
  },
  [])

  return { Field: Wrapped }
}
