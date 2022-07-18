import { FC, RefObject } from 'react';
import { FormErrorsShape, RegisteredField, FormFieldProps } from '../types';
import { FieldProps } from '../components';
declare type UseFormDataReturnType<FormShape> = {
    value: FormShape;
    errors: FormErrorsShape<FormShape>;
    onChange: (value: FormShape, errors: FormErrorsShape<FormShape>) => void;
    isDirty: boolean;
    isValid: boolean;
    registeredFields: RefObject<{
        [key in keyof FormShape]: RegisteredField<FormShape>;
    }>;
    validate: (withFormUpdate?: boolean) => {
        [key: string]: any;
    };
    Form: FC;
    Field: <InputProps, ValueType extends FormShape[keyof FormShape]>(props: FieldProps<InputProps, ValueType, FormShape>) => JSX.Element;
};
export declare const useFormData: <FormShape extends {
    [key: string]: any;
}>(UIField: FC<FormFieldProps<any, any>>, initialValue: FormShape, initialErrors?: FormErrorsShape<FormShape> | undefined) => UseFormDataReturnType<FormShape>;
export {};
