import * as React from 'react';
import { BriefFormContext } from '../../context';
import { FormValuesShape, FormErrorsShape, FormInputProps, FormFieldProps } from '../../types';

export interface BriefFormProps {
  value: FormValuesShape;
  errors: FormErrorsShape;
  onChange: (value: FormValuesShape, errors: FormErrorsShape) => void;
  components: { [key: string]: React.ComponentType<FormInputProps> };
  field: React.ComponentType<FormFieldProps>;
  children: any;
}

export const BriefForm = React.memo((props: BriefFormProps) => {
  const { value, errors, children, onChange, components, field } = props;

  return (<BriefFormContext.Provider value={{ value, errors, onChange, components, field }}>
    {children}
  </BriefFormContext.Provider>);
});
