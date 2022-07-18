import React, { useContext, useEffect, useCallback, ReactElement } from 'react'
import { FormContextShape } from '../../types'
import { BriefFormContext } from '../../context'
import { FieldProps } from './FieldProps'

export const Field = function <FormShape, InputProps, ValueType extends FormShape[keyof FormShape]>(
  props: FieldProps<InputProps, ValueType, FormShape>
): ReactElement {
  const { name, input, label, error, required, inputProps, validator } = props
  const context = useContext<FormContextShape<FormShape>>(BriefFormContext)
  const { value, errors, onChange, UIField, registeredFields } = context
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
    throw new Error(`Field name "${String(name)}" doesn't present in form value object.`)
  }

  if (!Input) {
    throw new Error(`Cannot instantiate form input component for field "${String(name)}"`)
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
    <UIField error={error || errors[name]} required={required} label={label} name={String(name)}>
      <Input {...inputProps} value={value[name] as ValueType} error={safeErrors[name]} onChange={onFormInputChange} />
    </UIField>
  )
}
