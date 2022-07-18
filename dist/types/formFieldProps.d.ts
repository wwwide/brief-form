import { ReactNode, ReactElement } from 'react';
import { FormInputProps } from './FormInputProps';
/**
 * Props interface which should be implemented by UI field component
 * (which will draw label, errors, input component (a-ka children))
 */
export interface FormFieldProps<ValueType, InputProps> {
    children: ReactElement<FormInputProps<ValueType, InputProps>>;
    name: string;
    label?: ReactNode;
    error?: string;
    required?: boolean;
}
