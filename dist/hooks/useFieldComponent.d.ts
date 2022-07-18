import { FieldProps } from '../components';
export declare const useFieldComponent: <FormShape>() => {
    Field: <InputProps, ValueType extends FormShape[keyof FormShape]>(props: FieldProps<InputProps, ValueType, FormShape>) => JSX.Element;
};
