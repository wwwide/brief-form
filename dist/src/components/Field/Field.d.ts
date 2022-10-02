import React, { ReactElement } from 'react';
import { FormInputProps } from '../../types';
import { FieldProps } from './FieldProps';
export declare const Field: <FormShape, Input extends React.ComponentType<FormInputProps<any, any>>>(props: FieldProps<Input, FormShape>) => ReactElement;
