import * as React from 'react';
import { FormInputProps, FormValuesShape } from '../../types';
export interface FieldProps {
    name: string;
    type?: string;
    label?: React.ReactNode;
    component?: React.ComponentType<FormInputProps>;
    debounced?: boolean;
    required?: boolean;
    validator?: (v: any, f: FormValuesShape) => string | undefined;
    inputProps?: {
        [key: string]: any;
    };
    errorPosition?: string;
}
export declare const Field: React.MemoExoticComponent<(props: FieldProps) => JSX.Element>;
