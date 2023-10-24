import React, { ComponentType, useContext, useEffect, useCallback, ReactElement, useRef } from 'react'
import { FormContextValue, FormInputProps } from '../../types'
import { FormContext, FormConfigContext } from '../../context'
import { FieldProps, $InputProps } from './FieldProps'

export const Field = function <
  FormShape extends object,
  Input extends ComponentType<FormInputProps<any, any>>,
  FieldOwnProps
>(props: FieldProps<Input, FormShape, FieldOwnProps>): ReactElement {
  const { name, input, label, error, required, inputProps, fieldProps, validator, triggerValidatorBy } = props
  const { crashIfRequiredFieldDoesNotHaveValidator, skipFieldsValidationOnUserInput } = useContext(FormConfigContext)
  const ref = useRef<any>()

  const {
    value,
    errors,
    onChange,
    fieldRenderer: FR,
    registeredFields
  } = useContext<FormContextValue<FormShape>>(FormContext)

  const Input: ComponentType<FormInputProps<any, any>> = input
  const safeErrors = errors || {}

  useEffect(() => {
    if (registeredFields.current) {
      if (!registeredFields.current[name]) {
        registeredFields.current[name] = {
          validator,
          triggerValidatorBy,
          ref
        }
      }
    }

    return () => {
      if (registeredFields.current) {
        delete registeredFields.current[name]
      }
    }
  }, [name, validator, ref])

  if ((triggerValidatorBy || []).indexOf(name) !== -1) {
    throw new Error('Field cannot contain itself in "triggerValidatorBy" array.')
  }

  if (Object.keys(value).indexOf(String(name)) === -1) {
    throw new Error(`Field with name "${String(name)}" doesn't present in form value object.`)
  }

  if (!Input) {
    throw new Error(`Cannot instantiate form input component for field "${String(name)}"`)
  }

  if (required && !validator) {
    const message = `
      Field "${String(name)}" is required but doesn't have a validator, which should check it
      for "empty" value. Remove "required" property or add a validator.
    `
    if (crashIfRequiredFieldDoesNotHaveValidator) {
      throw new Error(message)
    } else {
      console.error(message)
    }
  }

  const onFormInputChange = useCallback(
    (v: $InputProps<Input>['value'], e?: string) => {
      const validatorError = validator && !skipFieldsValidationOnUserInput ? validator(v, value) : undefined
      const finalError = validatorError || e || ''
      const finalErrors = { ...safeErrors, [name]: finalError }

      if (!finalError) {
        delete finalErrors[name]
      }

      onChange({ ...value, [name]: v }, finalErrors)
    },
    [validator, value, name, safeErrors, onChange, skipFieldsValidationOnUserInput]
  )

  return (
    <FR
      error={error || errors[name]}
      required={required}
      label={label}
      name={String(name)}
      containerRef={ref}
      inputProps={inputProps}
      fieldProps={fieldProps}
    >
      <Input
        {...inputProps}
        required={required}
        value={value[name]}
        label={label}
        error={safeErrors[name]}
        onChange={onFormInputChange}
      />
    </FR>
  )
}
