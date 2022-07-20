import React, { useContext, useEffect, useCallback, ReactElement } from 'react'
import { FormContextShape } from '../../types'
import { FormContext, FormConfigContext } from '../../context'
import { FieldProps } from './FieldProps'

export const Field = function <FormShape, InputProps, ValueType extends FormShape[keyof FormShape]>(
  props: FieldProps<InputProps, ValueType, FormShape>
): ReactElement {
  const { name, input, label, error, required, inputProps, validator } = props
  const { crashIfRequiredFieldDoesNotHaveValidator } = useContext(FormConfigContext)

  const {
    value,
    errors,
    onChange,
    fieldRenderer: FR,
    registeredFields
  } = useContext<FormContextShape<FormShape>>(FormContext)

  const Input = input
  const safeErrors = errors || {}

  useEffect(() => {
    if (registeredFields.current) {
      if (!registeredFields.current[name]) {
        registeredFields.current[name] = {
          validator
        }
      }
    }

    return () => {
      if (registeredFields.current) {
        delete registeredFields.current[name]
      }
    }
  }, [name, validator])

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
    (v: ValueType, e?: string) => {
      const validatorError = validator ? validator(v, value) : undefined
      const finalError = validatorError || e || ''
      const finalErrors = { ...safeErrors, [name]: finalError }

      if (!finalError) {
        delete finalErrors[name]
      }

      onChange({ ...value, [name]: v }, finalErrors)
    },
    [validator, value, name]
  )

  return (
    <FR error={error || errors[name]} required={required} label={label} name={String(name)}>
      <Input
        {...(inputProps as any)}
        required={required}
        value={value[name] as ValueType}
        error={safeErrors[name]}
        onChange={onFormInputChange}
      />
    </FR>
  )
}
