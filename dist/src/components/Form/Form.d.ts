import { ReactElement } from 'react';
import { FormProps } from './FormProps';
export declare const Form: <FormShape extends {
    [key: string]: any;
}>(props: FormProps<FormShape>) => ReactElement;
