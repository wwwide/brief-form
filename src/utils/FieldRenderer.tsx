import React, { ReactElement } from 'react'
import { FieldRendererProps } from '../types'

type FieldRendererOpts = {
  labelPosition?: string
}

export const FieldRenderer = function <ValueType, InputProps>(
  props: FieldRendererProps<ValueType, InputProps, FieldRendererOpts>
): ReactElement {
  const { label, required, error, children, dataId, containerRef } = props
  const { suffix, value, render } = dataId

  const dataAttr: any = {}

  if (render) {
    dataAttr[`data-${suffix}`] = value
  }

  return (
    <div style={{ marginBottom: '20px' }} {...dataAttr} ref={containerRef}>
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
