/// <reference types="react" />
import { FormConfig, FormErrorsShape } from '../types';
import { FieldProps } from '../components';
declare type UseFormDataReturnType<FormShape> = {
    config: FormConfig<FormShape>;
    isDirty: boolean;
    isValid: boolean;
    validate: (withFormUpdate?: boolean) => {
        [key: string]: any;
    };
    Field: <InputProps, ValueType>(props: FieldProps<InputProps, ValueType, FormShape>) => JSX.Element;
};
export declare const useFormData: <FormShape extends {
    [key: string]: any;
}>(initialValue: FormShape, initialErrors?: FormErrorsShape<FormShape> | undefined) => UseFormDataReturnType<FormShape>;
export {};
