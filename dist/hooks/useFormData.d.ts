import * as React from 'react';
import { FormDataOptions, RegisteredField } from '../types';
declare type ReturnType<T, E> = {
    formValue: T;
    formErrors: E;
    onChange: (value: T, errors: E) => void;
    isDirty: boolean;
    isValid: boolean;
    registeredFields: React.RefObject<{
        [key: string]: RegisteredField;
    }>;
    validate: (withFormUpdate?: boolean) => ({
        [key: string]: any;
    });
};
export declare const useFormData: <T, E>(initial: T, errors?: E | undefined, opts?: FormDataOptions | undefined) => ReturnType<T, E>;
export {};
