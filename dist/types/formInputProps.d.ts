import * as React from 'react';
export interface FormInputProps extends React.ComponentProps<any> {
    value: any;
    onChange: (value: any, error: undefined | string) => void;
    error?: string;
    debounced?: boolean;
    required?: boolean;
}
