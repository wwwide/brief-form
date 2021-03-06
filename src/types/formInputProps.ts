/**
 * Props interface for input component which should be passed and rendered inside form field.
 */
export interface FormInputProps<V, P> {
  opts: P
  value: V
  onChange: (value: V, error?: string) => void
  error?: string
  required?: boolean
}
