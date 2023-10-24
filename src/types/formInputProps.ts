import { ReactNode } from 'react'

/**
 * Base form input props.
 */
export type BaseFormInputProps<V> = {
  value?: V
  label?: ReactNode
  onChange?: (value: V, error?: string) => void
  error?: string
  required?: boolean
  className?: string
  name?: string
  readonly fieldDataId?: {
    suffix: string
    value: string
    render: boolean
  }
}

/**
 * Props interface for input component which should be passed and rendered inside form field.
 */
export type FormInputProps<V, P> = BaseFormInputProps<V> & P
