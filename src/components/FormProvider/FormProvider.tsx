import React, { FC, memo } from 'react'
import { FormProviderProps } from './FormProviderProps'
import { FormConfigContext } from '../../context'

export const FormProvider: FC<FormProviderProps> = memo(({ children, fieldRenderer }) => {
  return <FormConfigContext.Provider value={{ fieldRenderer: fieldRenderer }}>{children}</FormConfigContext.Provider>
})
