import React, { FC, memo } from 'react'
import { FormProviderProps } from './FormProviderProps'
import { FormConfigContext } from '../../context'

export const FormProvider: FC<FormProviderProps> = memo(
  ({ children, fieldRenderer, crashIfRequiredFieldDoesNotHaveValidator, skipFieldsValidationOnUserInput }) => {
    return (
      <FormConfigContext.Provider
        value={{
          crashIfRequiredFieldDoesNotHaveValidator,
          skipFieldsValidationOnUserInput,
          fieldRenderer: fieldRenderer
        }}
      >
        {children}
      </FormConfigContext.Provider>
    )
  }
)
