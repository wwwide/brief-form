import { FC } from 'react';
import { FormFieldProps, BriefFormConfig } from '../types';
export declare const useFormComponent: <FormShape>(config: BriefFormConfig<FormShape>, UIField: FC<FormFieldProps<any, any>>) => {
    Form: FC;
};
