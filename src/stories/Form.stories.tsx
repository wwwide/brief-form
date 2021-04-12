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
  const { value, error, onChange, ...rest } = props;
  return (<input
    {...rest}
    value={value}
    onChange={(e) => onChange(e.target.value, undefined)}
  />);
};

const components = {
  'input': Input,
};

export const BriefFormSample: Story<BriefFormProps> = (props: BriefFormProps) => {
  const { formValue, formErrors, onChange } = useFormData(props.value, props.errors);

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
    >
      <Field
        required
        name="name"
        label="Name"
        type="input"
        inputProps={{
          style: { border: '3px solid red' }
        }}
      />
      <Field
        required
        name="age"
        label="Age"
        type="input"
        inputProps={{}}
      />
    </BriefForm>
  </div>);
};

BriefFormSample.args = {
  value: {
    name: 'Andrey',
    age: '35',
  },
  errors: {
    name: 'Unknown error!'
  }
};