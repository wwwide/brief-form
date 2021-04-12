import { FormValuesShape, FormErrorsShape } from '../types';
declare type ReturnType = {
    formValue: FormValuesShape;
    formErrors: FormErrorsShape;
    onChange: (value: FormValuesShape, errors: FormErrorsShape) => void;
    isDirty: boolean;
    isValid: boolean;
};
export declare const useFormData: (initial: FormValuesShape, errors: FormErrorsShape) => ReturnType;
export {};
