import { RefObject, useCallback, useMemo } from 'react'
import { FormErrorsShape, FormValidateFunction, RegisteredField } from '../types'

export type UseValidateValue<FormShape> = {
  validate: FormValidateFunction<FormShape>
}

/**
 * Check if form is valid and get value in percentage of ita fill.
 * @param value - form value.
 * @param errors - form errors.
 * @returns - "valid" flag and "validity" in percent.
 */
export const calculateValidity = <FormShape extends { [key: string]: string | undefined }>(
  value: FormShape,
  errors: FormErrorsShape<FormShape>
) => {
  const entriesCount = Object.values(value).length
  const entriesCountWithErrors = Object.values(errors).filter((v) => !!v).length
  return {
    validity: Math.round(((entriesCount - entriesCountWithErrors) / entriesCount) * 100),
    valid: !entriesCountWithErrors
  }
}

/**
 * Hook returning validate function. Optionally this function can update
 * form UI during the validation.
 * @param registeredFields - mutable object keeping form fields metadata.
 * @param value - form value.
 * @param errors - form errors.
 * @param updateErrorsRoutine - routine for updating form errors
 * @returns validate function.
 */
export const useValidate = <FormShape extends { [key: string]: string | undefined }>(
  registeredFields: RefObject<{ [key in keyof FormShape]: RegisteredField<FormShape> }>,
  value: FormShape,
  errors: FormErrorsShape<FormShape>,
  updateErrorsRoutine: (errors: FormErrorsShape<FormShape>) => void
): UseValidateValue<FormShape> => {
  const validate: FormValidateFunction<FormShape> = useCallback(
    (options) => {
      const updateFields = options?.updateFields || false
      const finalValue = options?.value || value
      const finalErrors = options?.errors || errors

      // Errors collector
      const result: FormErrorsShape<FormShape> = Object.keys(finalValue).reduce((p, c) => {
        return { ...p, [c]: '' }
      }, finalValue)

      if (registeredFields.current) {
        // Go through all registered form fields and validate each field
        Object.keys(registeredFields.current).forEach((key) => {
          // Get current field meta
          const meta: RegisteredField<FormShape> | null = registeredFields.current
            ? registeredFields.current[key]
            : null

          const fieldValue = finalValue[key]
          const validatorError = meta?.validator ? meta.validator(fieldValue, finalValue) : undefined
          const error = validatorError || finalErrors[key]

          if (error) {
            result[key as keyof FormShape] = error
          } else {
            delete result[key]
          }
        })
      }

      if (updateFields) {
        updateErrorsRoutine({ ...finalErrors, ...result })
      }

      const { valid, validity } = calculateValidity(finalValue, result)

      return {
        validity,
        valid,
        errors: result
      }
    },
    [registeredFields, value, updateErrorsRoutine, errors]
  )

  return useMemo(
    () => ({
      validate
    }),
    [validate]
  )
}
