/// <reference types="react" />
import { FieldProps } from '../components';
export declare type UseFieldComponentReturnValue<FormShape> = {
    Field: <InputProps, ValueType extends FormShape[keyof FormShape]>(props: FieldProps<InputProps, ValueType, FormShape>) => JSX.Element;
};
export declare const useFieldComponent: <FormShape>() => UseFieldComponentReturnValue<FormShape>;
