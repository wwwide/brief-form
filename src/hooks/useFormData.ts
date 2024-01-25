import isEqual from 'lodash.isequal'
import { useCallback, useState, useRef, useMemo, useContext, useEffect } from 'react'
import { FormConfigContext } from '../context'
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
  skipFieldsValidationOnUserInput?: boolean
  alwaysSyncWithInitialValueAndErrors?: boolean
}

export const useFormData = <FormShape extends { [key: string]: any }, FieldOwnOpts = unknown>(
  opts: UseFormDataOpts<FormShape>
): UseFormDataReturnType<FormShape, FieldOwnOpts> => {
  const {
    initialValue,
    initialErrors,
    onFormChanged,
    onBeforeChange,
    skipFieldsValidationOnUserInput,
    alwaysSyncWithInitialValueAndErrors
  } = opts

  const context = useContext(FormConfigContext)
  const { Field } = useFieldComponent<FormShape, FieldOwnOpts>()
  const [savedInitialValue, setSavedInitialValue] = useState<FormShape>(initialValue)
  const [isDirty, setDirty] = useState(false)
  const [value, setValue] = useState<FormShape>(initialValue)

  const safeInitialErrors = useMemo(
    () => initialErrors || Object.keys(initialValue).reduce((p, c) => ({ ...p, [c]: undefined }), initialValue),
    [initialErrors, initialValue]
  )

  const [savedInitialErrors, setSavedInitialErrors] = useState<FormErrorsShape<FormShape>>(safeInitialErrors)
  const [errors, setErrors] = useState<FormErrorsShape<FormShape>>(safeInitialErrors)

  useEffect(() => {
    // Run this code if we want to reset form every time whem initial value, or initial errors updates.
    if (alwaysSyncWithInitialValueAndErrors || context.alwaysSyncWithInitialValueAndErrors) {
      // if current value is not equal to initial value and saved initial value is also not
      // equal to initial value, it means that initial value was changed.
      // If case if current form value is changed, initial value and saved initial value
      // would be equal.
      if (!isEqual(value, initialValue) && !isEqual(initialValue, savedInitialValue)) {
        setValue(initialValue)
        setSavedInitialValue(initialValue)
        setDirty(false)
      }

      // Same for errors. We want to update it only if hook opts are updated, not when local
      // form errors are chaged in some way.
      if (!!initialErrors && !isEqual(errors, initialErrors) && !isEqual(initialErrors, savedInitialErrors)) {
        setErrors(initialErrors)
        setSavedInitialErrors(initialErrors)
      }
    }
  }, [initialValue, savedInitialValue, initialErrors, savedInitialErrors, alwaysSyncWithInitialValueAndErrors, context])

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
    initialValue: savedInitialValue,
    setInitialValue: setSavedInitialValue,
    skipFieldsValidationOnUserInput: skipFieldsValidationOnUserInput || context.skipFieldsValidationOnUserInput
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
