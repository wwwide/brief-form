import { FC } from 'react';
import { FormFieldProps } from '.';
/**
 * Context used by form to get its flobal setup:
 * 1. fieldRenderer - component used to draw UI (label, input, error)
 */
export declare type FormConfigContextShape = {
    fieldRenderer: FC<FormFieldProps<any, any>>;
    crashIfRequiredFieldDoesNotHaveValidator: boolean;
};
