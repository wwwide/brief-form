/// <reference types="react" />
import { FieldProps } from '../components';
export declare type UseFieldComponentReturnValue<FormShape> = {
    Field: <InputProps, ValueType>(props: FieldProps<InputProps, ValueType, FormShape>) => JSX.Element;
};
export declare const useFieldComponent: <FormShape>() => UseFieldComponentReturnValue<FormShape>;
