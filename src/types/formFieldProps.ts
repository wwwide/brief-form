import * as React from 'react';

export interface FormFieldProps {
  children: any;
  name: string;
  label?: React.ReactNode;
  error?: string;
  required?: boolean;
}
