import { useCallback, useState, useRef, ComponentType, ReactElement, useMemo } from 'react'
import isEqual from 'lodash.isequal'
import { FormConfig, FormErrorsShape, RegisteredField, FormInputProps } from '../types'
import { useValidate } from './useValidate'
import { useFieldComponent } from './useFieldComponent'
import { FieldProps, Form, FormProps } from '../components'

export type UseFormDataReturnType<FormShape> = {
  config: FormConfig<FormShape>
  isDirty: boolean
  isValid: boolean
  validate: (withFormUpdate?: boolean) => { valid: boolean; errors: { [key: string]: string | undefined } }
  reset: (initialValue?: FormShape, errors?: FormErrorsShape<FormShape>) => void
  Form: <FormShape extends { [key: string]: any }>(props: FormProps<FormShape>) => ReactElement
  Field: <Input extends ComponentType<FormInputProps<any, any>>>(props: FieldProps<Input, FormShape>) => JSX.Element
}

export type UseFormDataOpts<FormShape extends { [key: string]: any }> = {
  initialValue: FormShape
  initialErrors?: FormErrorsShape<FormShape>
  onFormChanged?: (value: FormShape, errors: FormErrorsShape<FormShape>) => void
}

export const useFormData = <FormShape extends { [key: string]: any }>(
  opts: UseFormDataOpts<FormShape>
): UseFormDataReturnType<FormShape> => {
  const { initialValue, initialErrors, onFormChanged } = opts
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

      if (onFormChanged) {
        onFormChanged(initialValue || savedInitialvalue, errors || ({} as any))
      }
    },
    [savedInitialvalue, setValue, setDirty, setErrors, setSavedInitialValue, onFormChanged]
  )

  const registeredFields = useRef<{ [key in keyof FormShape]: RegisteredField<FormShape> }>(
    Object.keys(value).reduce((p, c) => ({ ...p, [c]: undefined }), value)
  )

  const { validate } = useValidate<FormShape>(registeredFields, value, errors, setErrors)

  const onChange = useCallback(
    (newValue: FormShape, errors: FormErrorsShape<FormShape>) => {
      setValue(newValue)

      /************************************************************/

      // 1. Collect all form fields which were updated.
      const updatedKeys = Object.keys(newValue).filter((key) => !isEqual(newValue[key], value[key]))

      // 2. Find fields which should be re-validated when some of fields from step 1 are updated.
      const fieldsToBeRevalidated = Object.keys(registeredFields.current).filter((key) => {
        const fieldMeta = registeredFields.current[key]
        return fieldMeta?.triggerValidatorBy?.some((i) => updatedKeys.includes(i.toString()))
      })

      // 3. Combine existing errors with errors from re-validated dependent fields.
      const newErrors = fieldsToBeRevalidated.reduce(
        (p, c) => ({
          ...p,
          [c]: (() => {
            const validator = registeredFields.current[c].validator
            if (validator) {
              return validator(newValue[c], newValue)
            }
            return errors[c]
          })()
        }),
        errors
      )

      /************************************************************/

      setErrors(newErrors)
      setDirty(!isEqual(initialValue, newValue))

      if (onFormChanged) {
        onFormChanged(newValue, newErrors)
      }
    },
    [initialValue, value, onFormChanged]
  )

  const isValid = !Object.values(errors).filter((v) => !!v).length

  const result = useMemo(() => {
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
  }, [isDirty, isValid, validate, reset, Field, Form, value, errors, onChange, registeredFields])

  return result
}
