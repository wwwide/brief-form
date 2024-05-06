import isEqual from 'lodash.isequal'
import { MutableRefObject, useCallback } from 'react'
import {
  BeforeFormChangeHandler,
  FormBaseChangeHandler,
  FormChangedHandler,
  FormErrorsShape,
  RegisteredField
} from '../types'

export type UseFormBaseChangeHandlerOpts<FormShape> = {
  initialValue: FormShape
  initialErrors: FormErrorsShape<FormShape>
  setValue: (value: FormShape) => void
  setInitialValue: (value: FormShape) => void
  setErrors: (errors: FormErrorsShape<FormShape>) => void
  setDirty: (dirty: boolean) => void
  oldValue: FormShape
  oldErrors: FormErrorsShape<FormShape>
  registeredFields: MutableRefObject<{ [key in keyof FormShape]: RegisteredField<FormShape> }>
  onFormChanged?: FormChangedHandler<FormShape>
  onBeforeChange?: BeforeFormChangeHandler<FormShape>
  skipFieldsValidationOnUserInput?: boolean
}

export const useFormBaseChangeHandler = <FormShape extends { [key: string]: any }>(
  opts: UseFormBaseChangeHandlerOpts<FormShape>
): FormBaseChangeHandler<FormShape> => {
  const {
    setValue,
    setInitialValue,
    setErrors,
    setDirty,
    oldValue,
    oldErrors,
    registeredFields,
    initialValue,
    initialErrors,
    onFormChanged,
    onBeforeChange,
    skipFieldsValidationOnUserInput
  } = opts

  return useCallback(
    ({ value, errors, reset, manual, dirty }) => {
      let finalErrors: FormErrorsShape<FormShape> = oldErrors

      /**
       * Check if this function call makes sense.
       */

      if (!value && !errors && !reset && typeof dirty === 'undefined') {
        return
      }

      /**
       * "Reset" flag makes sense only with "manual" flag.
       */

      if (reset && !manual) {
        throw new Error('"reset" flag can be used only with "manual=true"')
      }

      /**
       * If function is called in the manual mode, we don't need to call
       * transform function and expext that user want to set value and error
       * as is (or just reset dirty flag).
       */
      if (manual) {
        const isValueChanged = !!value && !isEqual(value, oldValue)

        if (isValueChanged) {
          setValue(value)
        }

        const isErrorsChanged = !!errors && !isEqual(errors, oldErrors)

        if (isErrorsChanged) {
          setErrors(errors)
        }

        if (reset) {
          setInitialValue(value || initialValue)
          setValue(value || initialValue)
          setErrors(errors || initialErrors)
        }

        setDirty(typeof dirty === 'undefined' ? (reset ? false : !isEqual(initialValue, value)) : dirty)
      } else {
        /**
         * Function is called due to user input, so onBeforeFormChange and dependent
         * validation should be performed.
         * In this case value and errors can't be undefined
         */

        if (!value || !errors) {
          throw new Error(`
            Base form change handler called due to user input, but with
            value=undefined or errors=undefined.
          `)
        }

        /**
         * Try to transform value and errors before we start processing other cases.
         */

        const { value: newValue, errors: newErrors } = onBeforeChange
          ? onBeforeChange({ oldValue, oldErrors, value, errors })
          : { value, errors }

        if (!isEqual(newValue, oldValue)) {
          setValue(newValue)
        }

        /**
         * Collect all form fields which were updated.
         */

        const updatedKeys = Object.keys(newValue).filter((key) => !isEqual(newValue[key], oldValue[key]))

        /**
         * Find fields which should be re-validated when some of fields from step 1 are updated.
         */

        const fieldsToBeRevalidated = Object.keys(registeredFields.current).filter((key) => {
          const fieldMeta = registeredFields.current[key]
          return fieldMeta?.triggerValidatorBy?.some((i) => updatedKeys.includes(i.toString()))
        })

        /**
         * Combine existing errors with errors from re-validated dependent fields.
         */

        const errorsAfterValidation = fieldsToBeRevalidated.reduce(
          (p, c) => ({
            ...p,
            [c]: (() => {
              const validator = registeredFields.current[c].validator
              if (validator && !skipFieldsValidationOnUserInput) {
                return validator(newValue[c], newValue)
              }
              return newErrors[c]
            })()
          }),
          newErrors
        )

        /**
         * New explicitly passed "errors" are written over errors got after fields validation.
         * If function is called in manual mode
         */

        finalErrors = {
          ...newErrors,
          ...errorsAfterValidation
        }

        if (!isEqual(finalErrors, oldErrors)) {
          setErrors(finalErrors)
        }

        setDirty(!isEqual(initialValue, newValue))

        if (onFormChanged) {
          onFormChanged(newValue, finalErrors, updatedKeys)
        }
      }
    },
    [
      setValue,
      setInitialValue,
      setErrors,
      setDirty,
      oldValue,
      oldErrors,
      registeredFields,
      initialValue,
      initialErrors,
      onFormChanged,
      onBeforeChange,
      skipFieldsValidationOnUserInput
    ]
  )
}
