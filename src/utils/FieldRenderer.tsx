import React, { ReactElement } from 'react'
import { FieldRendererProps } from '../types'

type FieldRendererOpts = {
  labelPosition?: string
}

export const FieldRenderer = function <ValueType, InputProps>(
  props: FieldRendererProps<ValueType, InputProps, FieldRendererOpts>
): ReactElement {
  const { label, required, error, children } = props

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
