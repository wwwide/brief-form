import { FC, RefObject } from 'react';
import { FormErrorsShape } from './FormErrorsShape';
import { RegisteredField, FormFieldProps } from '.';
/**
 * Context used by inner fields. It provides:
 * 1. value - current form value
 * 2. errors - form errors
 * 3. onChange - form change handler
 * 4. fieldRenderer - component used to draw UI (label, input, error)
 * 5. registeredFields - mutable object keeping metadata for every form field
 */
export declare type FormContextShape<FormShape> = {
    value: FormShape;
    errors: FormErrorsShape<FormShape>;
    onChange: (value: FormShape, errors: FormErrorsShape<FormShape>) => void;
    fieldRenderer: FC<FormFieldProps<any, any>>;
    registeredFields: RefObject<{
        [key in keyof FormShape]: RegisteredField<FormShape>;
    }>;
};
