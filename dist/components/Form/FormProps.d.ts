import { FC } from 'react';
import { FormConfig, FormFieldProps } from '../../types';
export interface FormProps<FormShape> {
    config: FormConfig<FormShape>;
    UIField: FC<FormFieldProps<any, any>>;
    children?: any;
}
