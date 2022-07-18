import { createContext, createRef } from 'react'
import { FormContextShape } from '../types'

export const FormContext = createContext<FormContextShape<any>>({
  value: {},
  errors: {},
  UIField: () => {
    return null
  },
  onChange: () => {
    return
  },
  registeredFields: createRef()
})
