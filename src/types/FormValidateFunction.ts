import { FormErrorsShape } from './FormErrorsShape'

export type FormValidateFunctionReturnValue<FormShape> = {
  valid: boolean
  validity: number
  errors: FormErrorsShape<FormShape>
}

export type FormValidateFunction<FormShape> = (withFormUpdate?: boolean) => FormValidateFunctionReturnValue<FormShape>
