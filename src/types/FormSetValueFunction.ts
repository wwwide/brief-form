import { FormBaseChangeHandlerOpts } from './FormBaseChangeHandler'

export type FormSetValueFunction<FormShape> = (opts: Omit<FormBaseChangeHandlerOpts<FormShape>, 'manual'>) => void
