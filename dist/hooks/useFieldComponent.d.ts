import { ComponentType } from 'react';
import { FormInputProps } from '../types';
import { FieldProps } from '../components';
export declare type UseFieldComponentReturnValue<FormShape> = {
    Field: <Input extends ComponentType<FormInputProps<any, any>>>(props: FieldProps<Input, FormShape>) => JSX.Element;
};
export declare const useFieldComponent: <FormShape>() => UseFieldComponentReturnValue<FormShape>;
