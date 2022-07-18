import { RefObject } from 'react';
import { FormErrorsShape, RegisteredField } from '../types';
/**
 * Hook returning validate function. Optionally thid function can update
 * from UI during the validation.
 * @param registeredFields - mutable object keeping form fields metadata.
 * @param value - form value
 * @param errors - form errors
 * @param updateErrorsRoutine - routine for updating form errors
 * @returns validate function.
 */
export declare const useValidate: <FormShape extends {
    [key: string]: any;
}>(registeredFields: RefObject<{ [key in keyof FormShape]: RegisteredField<FormShape>; }>, value: FormShape, errors: FormErrorsShape<FormShape>, updateErrorsRoutine: (errors: FormErrorsShape<FormShape>) => void) => {
    validate: (withFormUpdate?: boolean) => FormErrorsShape<FormShape>;
};
