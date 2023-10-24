import React, { FC } from 'react'
import { FormInputProps } from '../types'

export const FormInput: FC<FormInputProps<string, { testId: string }>> = (props) => {
  const { value, onChange, fieldDataId, testId, ...rest } = props

  return (
    <input
      {...rest}
      value={value}
      onChange={(e) => {
        if (onChange) {
          onChange(e.target.value, undefined)
        }
      }}
      data-testid={testId}
    />
  )
}
