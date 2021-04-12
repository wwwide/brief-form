import * as React from 'react';
import { FormInputProps } from "./formInputProps";

export interface FormFieldProps {
  children: any;
  label?: React.ReactNode;
  error?: string;
  required?: boolean;
}
