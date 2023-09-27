import { useCallback, useState, useRef, useMemo } from 'react'
import {
  FormErrorsShape,
  RegisteredField,
  BeforeFormChangeHandler,
  FormChangeHandler,
  FormSetValueFunction,
  FormChangedHandler,
  FormValidateFunction,
  UseFormDataReturnType
} from '../types'
import { useValidate } from './useValidate'
import { useFormBaseChangeHandler } from './useFormBaseChangeHandler'
import { useFieldComponent } from './useFieldComponent'
import { Form } from '../components'

export type UseFormDataOpts<FormShape extends { [key: string]: any }> = {
  initialValue: FormShape
  initialErrors?: FormErrorsShape<FormShape>
  onBeforeChange?: BeforeFormChangeHandler<FormShape>
  onFormChanged?: FormChangedHandler<FormShape>
}

export const useFormData = <FormShape extends { [key: string]: any }>(
  opts: UseFormDataOpts<FormShape>
): UseFormDataReturnType<FormShape> => {
  const { initialValue, initialErrors, onFormChanged, onBeforeChange } = opts
  const { Field } = useFieldComponent<FormShape>()
  const [savedInitialvalue, setSavedInitialValue] = useState<FormShape>(initialValue)
  const [isDirty, setDirty] = useState(false)
  const [value, setValue] = useState<FormShape>(initialValue)

  const safeInitialErrors = useMemo(
    () => initialErrors || Object.keys(initialValue).reduce((p, c) => ({ ...p, [c]: undefined }), initialValue),
    [initialErrors, initialValue]
  )

  const [errors, setErrors] = useState<FormErrorsShape<FormShape>>(safeInitialErrors)

  const registeredFields = useRef<{ [key in keyof FormShape]: RegisteredField<FormShape> }>(
    Object.keys(value).reduce((p, c) => ({ ...p, [c]: undefined }), value)
  )

  const baseChangeHandler = useFormBaseChangeHandler({
    setValue,
    setErrors,
    setDirty,
    registeredFields,
    onFormChanged,
    onBeforeChange,
    oldValue: value,
    oldErrors: errors,
    initialErrors: safeInitialErrors,
    initialValue: savedInitialvalue,
    setInitialValue: setSavedInitialValue
  })

  const set: FormSetValueFunction<FormShape> = useCallback(
    (opts) => {
      baseChangeHandler({ ...opts, manual: true })
    },
    [baseChangeHandler]
  )

  const { validate } = useValidate<FormShape>(registeredFields, value, errors, setErrors)

  const onChange: FormChangeHandler<FormShape> = useCallback(
    (value, errors) => {
      baseChangeHandler({ value, errors })
    },
    [baseChangeHandler]
  )

  const isValid = !Object.values(errors).filter((v) => !!v).length

  return useMemo(() => {
    return {
      isDirty,
      isValid,
      set,
      Field,
      Form,
      validate: validate as FormValidateFunction<FormShape>,
      config: {
        value,
        errors,
        onChange,
        registeredFields
      }
    }
  }, [isDirty, isValid, validate, set, Field, Form, value, errors, onChange, registeredFields])
}
