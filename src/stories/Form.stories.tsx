import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { BriefForm, BriefFormProps, Field } from '../components';
import { FormFieldProps, FormInputProps } from '../types';
import { useFormData } from "../hooks";

export default {
  title: 'Form',
  component: BriefForm,
} as Meta;

const FieldRenderer = React.memo((props: FormFieldProps) => {
  const { label, required, error, children } = props;

  return (<div style={{ marginBottom: '20px' }}>
    {!!label && <div>{label}{required && <b style={{ color: 'red' }}>*</b>}</div>}
    {children}
    {!!error && <div><i>{error}</i></div>}
  </div>);
});

const Input = (props: FormInputProps) => {
  const { value, error, onChange, required, ...rest } = props;
  return (<input
    {...rest}
    required={required}
    value={value}
    onChange={(e) => onChange(e.target.value, Input.getError(e.target.value, required))}
  />);
};

Input.getError = (v: any, required?: boolean) => !required || !!v ? undefined : 'Required';

const components = {
  'input': Input,
};

export const BriefFormSample: Story<BriefFormProps> = (props: BriefFormProps) => {
  const {
    formValue,
    formErrors,
    onChange,
    registeredFields,
    validate,
    isValid,
    isDirty,
  } = useFormData(props.value, props.errors);

  const onChangeWrapper = React.useCallback((v, e) => {
    onChange(v, { ...e, age: v.name === 'Andrey' ? undefined : 'Old guy' });
  }, [onChange]);

  return (<div style={{ width: '500px', fontFamily: 'sans-serif' }}>
    <BriefForm
      value={formValue}
      errors={formErrors}
      onChange={onChangeWrapper}
      components={components}
      field={FieldRenderer}
      registeredFields={registeredFields}
    >
      <Field
        required
        name="name"
        label="Name"
        type="input"
        inputProps={{
          autoFocus: true,
        }}
        validator={(v, f) => v.length < 3 ? 'Name too short' : undefined}
      />
      <Field
        required
        name="age"
        label="Age"
        type="input"
      />
      <button onClick={() => { console.log(validate(true)); }}>Validate!</button>
      <button disabled={!isValid || !isDirty}>Submit!</button>
    </BriefForm>
  </div>);
};

BriefFormSample.args = {
  value: {
    name: '',
    age: '',
  },
  errors: {
    name: 'Unknown error!'
  }
};
