import { useCallback, useState, useRef, ComponentType, ReactElement, useMemo } from 'react'
import isEqual from 'lodash.isequal'
import {
  FormConfig,
  FormErrorsShape,
  RegisteredField,
  FormInputProps,
  BeforeFormChangeHandler,
  FormChangeHandler
} from '../types'
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
  onBeforeChange?: BeforeFormChangeHandler<FormShape>
  onFormChanged?: (value: FormShape | undefined, errors: FormErrorsShape<FormShape>) => void
}

export const useFormData = <FormShape extends { [key: string]: any }>(
  opts: UseFormDataOpts<FormShape>
): UseFormDataReturnType<FormShape> => {
  const { initialValue, initialErrors, onFormChanged, onBeforeChange } = opts
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

  const baseChangeHandler: FormChangeHandler<FormShape> = useCallback(
    (newValue, errors) => {
      if (newValue) {
        setValue(newValue)
      }

      /************************************************************/

      /**
       * 1. Collect all form fields which were updated.
       *    If new value is undefined, it means that we don't want to change form
       *    value, but only form errors. So in this case we won't have any updated keys.
       */
      const updatedKeys = newValue ? Object.keys(newValue).filter((key) => !isEqual(newValue[key], value[key])) : []

      /**
       * 2. Find fields which should be re-validated when some of fields from step 1 are updated.
       *    If new form value us undefined, as described in the paragraph one, no fields
       *    will be re-validated.
       */
      const fieldsToBeRevalidated = Object.keys(registeredFields.current).filter((key) => {
        const fieldMeta = registeredFields.current[key]
        return fieldMeta?.triggerValidatorBy?.some((i) => updatedKeys.includes(i.toString()))
      })

      /**
       * 3. Combine existing errors with errors from re-validated dependent fields.
       *    If we don't pass new form value, new errors are just errors provided in the function argument.
       */
      const newErrors = newValue
        ? fieldsToBeRevalidated.reduce(
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
        : errors

      /************************************************************/

      setErrors(newErrors)
      setDirty(newValue ? !isEqual(initialValue, newValue) : false)

      if (onFormChanged && newValue) {
        onFormChanged(newValue, newErrors)
      }
    },
    [initialValue, value, onFormChanged, onBeforeChange]
  )

  const onChange: FormChangeHandler<FormShape> = useCallback(
    (value, errors) => {
      if (onBeforeChange) {
        const transformed = onBeforeChange(value, errors)
        baseChangeHandler(transformed.value, transformed.errors)
      }
      baseChangeHandler(value, errors)
    },
    [baseChangeHandler, onBeforeChange]
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
