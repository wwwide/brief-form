import { MutableRefObject } from 'react'

/**
 * Field metadata.
 */
export type RegisteredField<FormShape> = {
  ref: MutableRefObject<any>
  validator?: (v: any, f: FormShape) => string | undefined
  triggerValidatorBy?: (keyof FormShape)[]
}
