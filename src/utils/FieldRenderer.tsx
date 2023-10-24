import React, { ReactElement } from 'react'
import { FieldRendererProps } from '../types'

export const FieldRenderer = function <ValueType, InputProps>(
  props: FieldRendererProps<ValueType, InputProps>
): ReactElement {
  const { label, required, error, children, ...rest } = props

  return (
    <div style={{ marginBottom: '20px' }}>
      {!!label && (
        <div>
          {label}
          {required && <b style={{ color: 'red' }}>*</b>}
        </div>
      )}
      {children}
      {!!error && (
        <div>
          <i>{error}</i>
        </div>
      )}
    </div>
  )
}
