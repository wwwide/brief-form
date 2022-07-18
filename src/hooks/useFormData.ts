import { FC, useCallback, useState, useRef } from 'react'
import isEqual from 'lodash.isequal'
import { FormConfig, FormErrorsShape, RegisteredField, FormFieldProps } from '../types'
import { useValidate } from './useValidate'
import { useFormComponent } from './useFormComponent'
import { useFieldComponent } from './useFieldComponent'
import { FieldProps } from '../components'

type UseFormDataReturnType<FormShape> = {
  config: FormConfig<FormShape>
  isDirty: boolean
  isValid: boolean
  validate: (withFormUpdate?: boolean) => { [key: string]: any }
  Form: FC
  Field: <InputProps, ValueType extends FormShape[keyof FormShape]>(
    props: FieldProps<InputProps, ValueType, FormShape>
  ) => JSX.Element
}

export const useFormData = <FormShape extends { [key: string]: any }>(
  UIField: FC<FormFieldProps<any, any>>,
  initialValue: FormShape,
  initialErrors?: FormErrorsShape<FormShape>
): UseFormDataReturnType<FormShape> => {
  const { Field } = useFieldComponent<FormShape>()

  const [value, setValue] = useState<FormShape>(initialValue)

  const [errors, setErrors] = useState<FormErrorsShape<FormShape>>(
    initialErrors || Object.keys(value).reduce((p, c) => ({ ...value, [c]: undefined }), value)
  )

  const [isDirty, setDirty] = useState(false)

  const registeredFields = useRef<{ [key in keyof FormShape]: RegisteredField<FormShape> }>(
    Object.keys(value).reduce((p, c) => ({ ...value, [c]: {} }), value)
  )

  const { validate } = useValidate<FormShape>(registeredFields, value, errors, setErrors)

  const onChange = useCallback(
    (value: FormShape, errors: FormErrorsShape<FormShape>) => {
      setValue(value)
      setErrors(errors)
      setDirty(!isEqual(initialValue, value))
    },
    [setValue, setErrors, setDirty, initialValue]
  )

  const { Form } = useFormComponent({ value, errors, onChange, registeredFields }, UIField)

  const isValid = !Object.keys(validate()).length

  return {
    isDirty,
    isValid,
    validate,
    Form,
    Field,
    config: {
      value,
      errors,
      onChange,
      registeredFields
    }
  }
}
