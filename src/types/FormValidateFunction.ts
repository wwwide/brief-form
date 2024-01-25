import { FormErrorsShape } from './formErrorsShape'

export type FormValidateFunctionReturnValue<FormShape> = {
  valid: boolean
  errors: FormErrorsShape<FormShape>
}

export type FormValidateFunction<FormShape> = (withFormUpdate?: boolean) => FormValidateFunctionReturnValue<FormShape>
