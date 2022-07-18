import { ReactElement } from 'react';
import { FieldProps } from './FieldProps';
export declare const Field: <FormShape, InputProps, ValueType extends FormShape[keyof FormShape]>(props: FieldProps<InputProps, ValueType, FormShape>) => ReactElement;
