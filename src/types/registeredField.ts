/**
 * Field metadata.
 */
export type RegisteredField<FormShape> = {
  validator?: (v: any, f: FormShape) => string | undefined
  triggerValidatorBy?: (keyof FormShape)[]
}
