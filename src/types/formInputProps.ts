/**
 * Props interface for input component which should be passed and rendered inside form field.
 */
export interface FormInputProps<V, I> {
  value: V
  onChange: (value: V, error?: string) => void
  error?: string
  inputProps?: I
}
