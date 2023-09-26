import { FormErrorsShape } from './FormErrorsShape'

export type BeforeFormChangeHandlerReturnValue<FormShape> = {
  value: FormShape | undefined
  errors: FormErrorsShape<FormShape>
}

export type BeforeFormChangeHandler<FormShape> = (
  value: FormShape | undefined,
  errors: FormErrorsShape<FormShape>
) => BeforeFormChangeHandlerReturnValue<FormShape>
