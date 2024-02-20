import { FormErrorsShape } from './'

export type FormBaseChangeHandlerOpts<FormShape> = {
  value?: FormShape
  errors?: FormErrorsShape<FormShape>
  reset?: boolean
  manual?: boolean
  dirty?: boolean
}

export type FormBaseChangeHandler<FormShape> = (opts: FormBaseChangeHandlerOpts<FormShape>) => void
