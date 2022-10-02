import { RefObject, useCallback } from 'react'
import { FormErrorsShape, RegisteredField } from '../types'

export type UseValidateValue = {
  validate: (withUpdate?: boolean) => { [key: string]: string | undefined }
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
): UseValidateValue => {
  const validate = useCallback(
    (withFormUpdate?: boolean) => {
      // Errors collector
      const result: FormErrorsShape<FormShape> = Object.keys(value).reduce((p, c) => {
        return { ...p, [c]: '' }
      }, value)

      if (registeredFields.current) {
        // Go through all registered form fields and validate each field
        Object.keys(registeredFields.current).forEach((key) => {
          // Get current field meta
          const meta: RegisteredField<FormShape> | null = registeredFields.current
            ? registeredFields.current[key]
            : null

          const fieldValue = value[key]
          const validatorError = meta?.validator ? meta.validator(fieldValue, value) : undefined
          const error = validatorError || errors[key]

          if (error) {
            result[key as keyof FormShape] = error
          } else {
            delete result[key]
          }
        })
      }

      if (withFormUpdate) {
        updateErrorsRoutine({ ...errors, ...result })
      }

      return result
    },
    [registeredFields, value, updateErrorsRoutine, errors]
  )

  return {
    validate
  }
}
