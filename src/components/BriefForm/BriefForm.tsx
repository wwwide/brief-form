import * as React from 'react';
import { BriefFormContext } from '../../context';
import { FormValuesShape, FormErrorsShape, FormInputProps, FormFieldProps } from '../../types';

export interface BriefFormProps {
  value: FormValuesShape;
  errors: FormErrorsShape;
  onChange: (value: FormValuesShape, errors: FormErrorsShape) => void;
  components: { [key: string]: React.ComponentType<FormInputProps> };
  field: React.ComponentType<FormFieldProps>;
  registeredFields: React.RefObject<{ [key: string]: any }>;
  children: any;
  onFieldReferenceSet?: (reference: React.RefObject<any>) => void;
}

export const BriefForm = React.memo((props: BriefFormProps) => {
  const { value, errors, children, onChange, components, field, registeredFields, onFieldReferenceSet } = props;

  return (<BriefFormContext.Provider value={{
    value,
    errors,
    onChange,
    components,
    field,
    registeredFields,
    onFieldReferenceSet,
  }}>
    {children}
  </BriefFormContext.Provider>);
});
