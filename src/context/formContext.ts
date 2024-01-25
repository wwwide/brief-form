import { createContext, createRef } from 'react'
import { FormContextValue } from '../types'

export const FormContext = createContext<FormContextValue<any>>({
  value: {},
  errors: {},
  fieldRenderer: () => {
    return null
  },
  onChange: () => {
    return
  },
  registeredFields: createRef(),
  name: '',
  disabled: undefined
})
