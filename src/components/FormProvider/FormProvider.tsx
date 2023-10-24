import React, { FC, memo } from 'react'
import { FormProviderProps } from './FormProviderProps'
import { FormConfigContext } from '../../context'

export const FormProvider: FC<FormProviderProps> = memo(
  ({
    children,
    fieldRenderer,
    crashIfRequiredFieldDoesNotHaveValidator,
    skipFieldsValidationOnUserInput,
    alwaysSyncWithInitialValueAndErrors,
    renderFieldsDataIds,
    dataIdSuffix
  }) => {
    return (
      <FormConfigContext.Provider
        value={{
          crashIfRequiredFieldDoesNotHaveValidator,
          skipFieldsValidationOnUserInput,
          alwaysSyncWithInitialValueAndErrors,
          renderFieldsDataIds,
          dataIdSuffix: dataIdSuffix || 'id',
          fieldRenderer: fieldRenderer
        }}
      >
        {children}
      </FormConfigContext.Provider>
    )
  }
)
