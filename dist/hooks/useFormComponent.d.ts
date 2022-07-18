import React, { FC, RefObject } from 'react';
import { FormErrorsShape, RegisteredField, FormFieldProps } from '../types';
export declare const useFormComponent: <FormShape>(value: FormShape, errors: FormErrorsShape<FormShape>, onChange: (value: FormShape, errors: FormErrorsShape<FormShape>) => void, registeredFields: React.RefObject<{ [key in keyof FormShape]: RegisteredField<FormShape>; }>, UIField: FC<FormFieldProps<any, any>>) => {
    Form: React.FC<{}>;
};
