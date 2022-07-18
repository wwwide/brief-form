import { FC } from 'react';
import { FormFieldProps, FormConfig } from '../types';
export declare const useFormComponent: <FormShape>(config: FormConfig<FormShape>, UIField: FC<FormFieldProps<any, any>>) => {
    Form: FC;
};
