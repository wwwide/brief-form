import { RefObject, useCallback, useMemo } from 'react'
import { FormErrorsShape, FormValidateFunction, FormValidateFunctionReturnValue, RegisteredField } from '../types'

export type UseValidateValue<FormShape> = {
  validate: (withUpdate?: boolean) => FormValidateFunctionReturnValue<FormShape>
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

      const entriesCount = Object.values(result).length
      const entriesCountWithErrors = Object.values(result).filter((v) => !!v).length

      return {
        errors: result,
        validity: Math.round(((entriesCount - entriesCountWithErrors) / entriesCount) * 100),
        valid: !entriesCountWithErrors
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
