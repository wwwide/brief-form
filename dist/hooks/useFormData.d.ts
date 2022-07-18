import { FC } from 'react';
import { FormConfig, FormErrorsShape, FormFieldProps } from '../types';
import { FieldProps } from '../components';
declare type UseFormDataReturnType<FormShape> = {
    config: FormConfig<FormShape>;
    isDirty: boolean;
    isValid: boolean;
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
