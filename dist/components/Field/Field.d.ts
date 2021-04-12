import * as React from 'react';
import { FormInputProps } from '../../types';
export interface FieldProps {
    name: string;
    type?: string;
    label?: React.ReactNode;
    component?: React.ComponentType<FormInputProps>;
    debounced?: boolean;
    required?: boolean;
    inputProps?: {
        [key: string]: any;
    };
}
export declare const Field: React.MemoExoticComponent<(props: FieldProps) => JSX.Element>;
