import { RefObject } from 'react';
import { FormErrorsShape, RegisteredField } from '../types';
export declare type UseValidateValue = {
    validate: (withUpdate?: boolean) => {
        [key: string]: string | undefined;
    };
};
/**
 * Hook returning validate function. Optionally this function can update
 * form UI during the validation.
 * @param registeredFields - mutable object keeping form fields metadata.
 * @param value - form value.
 * @param errors - form errors.
 * @param updateErrorsRoutine - routine for updating form errors
 * @returns validate function.
 */
export declare const useValidate: <FormShape extends {
    [key: string]: string | undefined;
}>(registeredFields: RefObject<{ [key in keyof FormShape]: RegisteredField<FormShape>; }>, value: FormShape, errors: FormErrorsShape<FormShape>, updateErrorsRoutine: (errors: FormErrorsShape<FormShape>) => void) => UseValidateValue;
