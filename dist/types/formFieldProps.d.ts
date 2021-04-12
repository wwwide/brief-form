import * as React from 'react';
export interface FormFieldProps {
    children: any;
    label?: React.ReactNode;
    error?: string;
    required?: boolean;
}
