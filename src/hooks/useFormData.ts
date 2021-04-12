import * as React from 'react';
import { FormValuesShape, FormErrorsShape } from '../types';

type ReturnType = {
  formValue: FormValuesShape;
  formErrors: FormErrorsShape;
  onChange: (value: FormValuesShape, errors: FormErrorsShape) => void;
  isDirty: boolean;
  isValid: boolean;
}

export const useFormData = (initial: FormValuesShape, errors: FormErrorsShape): ReturnType => {
  const [formValue, setFormValue] = React.useState<FormValuesShape>(initial);
  const [formErrors, setFormErrors] = React.useState<FormErrorsShape>(errors || {} as any);
  const [isDirty, setDirty] = React.useState(false);

  const isValid = !Object.keys(formErrors || {}).length;

  const onChange = React.useCallback((value: FormValuesShape, errors: FormErrorsShape) => {
    setFormValue(value);
    setFormErrors(errors);
    setDirty(true);
  }, [setFormValue, setFormErrors, setDirty]);

  return { formValue, formErrors, onChange, isDirty, isValid };
};
