import { FormErrorsShape } from './FormErrorsShape'

export type BeforeFormChangeHandlerReturnValue<FormShape> = {
  value: FormShape
  errors: FormErrorsShape<FormShape>
}

export type BeforeFormChangeHandler<FormShape> = (
  value: FormShape,
  errors: FormErrorsShape<FormShape>
) => BeforeFormChangeHandlerReturnValue<FormShape>
