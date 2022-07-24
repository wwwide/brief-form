import { ReactNode, ComponentType } from 'react';
import { FormInputProps } from '../../types';
export declare type $ElementProps<T> = T extends ComponentType<infer Props> ? Props extends object ? Props : never : never;
export interface FieldProps<Input extends ComponentType<FormInputProps<any, any>>, FormShape> {
    name: keyof FormShape;
    required?: boolean;
    error?: string;
    label?: ReactNode;
    input: Input;
    validator?: (v: $ElementProps<Input>['value'], f: FormShape) => string | undefined;
    inputProps: $ElementProps<Input>['opts'];
}
