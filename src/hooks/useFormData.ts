import { useCallback, useState, useRef, ComponentType, ReactElement } from 'react'
import isEqual from 'lodash.isequal'
import { FormConfig, FormErrorsShape, RegisteredField, FormInputProps } from '../types'
import { useValidate } from './useValidate'
import { useFieldComponent } from './useFieldComponent'
import { FieldProps, Form, FormProps } from '../components'

export type UseFormDataReturnType<FormShape> = {
  config: FormConfig<FormShape>
  isDirty: boolean
  isValid: boolean
  validate: (withFormUpdate?: boolean) => { [key: string]: string | undefined }
  reset: (initialValue?: FormShape, errors?: FormErrorsShape<FormShape>) => void
  Form: <FormShape extends { [key: string]: any }>(props: FormProps<FormShape>) => ReactElement
  Field: <Input extends ComponentType<FormInputProps<any, any>>>(props: FieldProps<Input, FormShape>) => JSX.Element
}

export const useFormData = <FormShape extends { [key: string]: any }>(
  initialValue: FormShape,
  initialErrors?: FormErrorsShape<FormShape>
): UseFormDataReturnType<FormShape> => {
  const { Field } = useFieldComponent<FormShape>()
  const [savedInitialvalue, setSavedInitialValue] = useState<FormShape>(initialValue)
  const [value, setValue] = useState<FormShape>(initialValue)

  const [errors, setErrors] = useState<FormErrorsShape<FormShape>>(
    initialErrors || Object.keys(value).reduce((p, c) => ({ ...p, [c]: undefined }), value)
  )

  const [isDirty, setDirty] = useState(false)

  const reset = useCallback(
    (initialValue?: FormShape, errors?: FormErrorsShape<FormShape>) => {
      const initial = initialValue || savedInitialvalue
      setSavedInitialValue(initial)
      setValue(initialValue || savedInitialvalue)
      setDirty(false)
      setErrors(errors || ({} as any))
    },
    [savedInitialvalue, setValue, setDirty, setErrors, setSavedInitialValue]
  )

  const registeredFields = useRef<{ [key in keyof FormShape]: RegisteredField<FormShape> }>(
    Object.keys(value).reduce((p, c) => ({ ...p, [c]: undefined }), value)
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

  const isValid = !Object.values(validate()).filter((i) => !!i).length

  return {
    isDirty,
    isValid,
    validate,
    reset,
    Field,
    Form,
    config: {
      value,
      errors,
      onChange,
      registeredFields
    }
  }
}
