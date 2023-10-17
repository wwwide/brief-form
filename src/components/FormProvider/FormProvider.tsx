import React, { FC, memo } from 'react'
import { FormProviderProps } from './FormProviderProps'
import { FormConfigContext } from '../../context'

export const FormProvider: FC<FormProviderProps> = memo(
  ({
    children,
    fieldRenderer,
    crashIfRequiredFieldDoesNotHaveValidator,
    skipFieldsValidationOnUserInput,
    alwaysSyncWithInitialValueAndErrors
  }) => {
    return (
      <FormConfigContext.Provider
        value={{
          crashIfRequiredFieldDoesNotHaveValidator,
          skipFieldsValidationOnUserInput,
          alwaysSyncWithInitialValueAndErrors,
          fieldRenderer: fieldRenderer
        }}
      >
        {children}
      </FormConfigContext.Provider>
    )
  }
)
