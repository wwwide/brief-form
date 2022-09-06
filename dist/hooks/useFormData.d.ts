import { ComponentType, ReactElement } from 'react';
import { FormConfig, FormErrorsShape, FormInputProps } from '../types';
import { FieldProps, FormProps } from '../components';
declare type UseFormDataReturnType<FormShape> = {
    config: FormConfig<FormShape>;
    isDirty: boolean;
    isValid: boolean;
    validate: (withFormUpdate?: boolean) => {
        [key: string]: string | undefined;
    };
    reset: (initialValue?: FormShape, errors?: FormErrorsShape<FormShape>) => void;
    Form: <FormShape extends {
        [key: string]: any;
    }>(props: FormProps<FormShape>) => ReactElement;
    Field: <Input extends ComponentType<FormInputProps<any, any>>>(props: FieldProps<Input, FormShape>) => JSX.Element;
};
export declare const useFormData: <FormShape extends {
    [key: string]: any;
}>(initialValue: FormShape, initialErrors?: FormErrorsShape<FormShape> | undefined) => UseFormDataReturnType<FormShape>;
export {};
