import { FormErrorsShape } from './FormErrorsShape'

export type FormValidateFunctionReturnValue<FormShape> = {
  valid: boolean
  validity: number
  errors: FormErrorsShape<FormShape>
}

export type FormValidateFunctionOptions<FormShape> = {
  updateFields?: boolean
  value?: FormShape
  errors?: FormErrorsShape<FormShape>
}

export type FormValidateFunction<FormShape> = (
  options?: FormValidateFunctionOptions<FormShape>
) => FormValidateFunctionReturnValue<FormShape>
