import * as React from 'react';

type ReturnType<T, E> = {
  formValue: T;
  formErrors: E;
  onChange: (value: T, errors: E) => void;
  isDirty: boolean;
  isValid: boolean;
}

export const useFormData = <T, E>(initial: T, errors?: E): ReturnType<T, E> => {
  const [formValue, setFormValue] = React.useState<T>(initial);
  const [formErrors, setFormErrors] = React.useState(errors || {} as any);
  const [isDirty, setDirty] = React.useState(false);

  const isValid = !Object.keys(formErrors || {}).length;

  const onChange = React.useCallback((value: T, errors: E) => {
    setFormValue(value);
    setFormErrors(errors);
    setDirty(true);
  }, [setFormValue, setFormErrors, setDirty]);

  return { formValue, formErrors, onChange, isDirty, isValid };
};
