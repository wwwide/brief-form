import { FormErrorsShape } from './FormErrorsShape'

export type BeforeFormChangeHandlerArgs<FormShape> = {
  value: FormShape
  errors: FormErrorsShape<FormShape>
  oldValue: FormShape
  oldErrors: FormErrorsShape<FormShape>
}

export type BeforeFormChangeHandlerReturnValue<FormShape> = {
  value: FormShape
  errors: FormErrorsShape<FormShape>
}

export type BeforeFormChangeHandler<FormShape> = (
  args: BeforeFormChangeHandlerArgs<FormShape>
) => BeforeFormChangeHandlerReturnValue<FormShape>
