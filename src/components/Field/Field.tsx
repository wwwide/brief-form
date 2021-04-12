import * as React from 'react';
import { BriefFormContext } from '../../context';
import { FormInputProps, FormValuesShape } from '../../types';

export interface FieldProps {
  name: string;
  type?: string;
  label?: React.ReactNode;
  component?: React.ComponentType<FormInputProps>;
  debounced?: boolean;
  required?: boolean;
  validator?: (v: any, f: FormValuesShape) => string | undefined;
  inputProps?: { [key: string]: any };
}

export const Field = React.memo((props: FieldProps) => {
  const { name, type, component, debounced, required, label, inputProps, validator } = props;

  if (!type && !component) {
    throw new Error('Either "type" or "component" props should be passed to render proper form input control.');
  }

  return (<BriefFormContext.Consumer>
    {(context) => {
      const { value, errors, onChange, components, field: Field } = context;
      const FormInput = component || components[type || ''];

      if (Object.keys(value).indexOf(name) === -1) {
        throw new Error(`Field name "${name}" doesn't present in form value object.`);
      }

      const onFormInputChange = (v: any, e?: string) => {
        const validatorError = validator ? validator(v, value) : undefined;
        onChange({ ...value, [name]: v }, { ...errors, [name]: e || validatorError });
      };

      return (<Field required={required} error={errors[name]} label={label}>
        <FormInput
          {...inputProps}
          value={value[name]}
          error={errors[name]}
          onChange={onFormInputChange}
          debounced={debounced}
          required={required}
        />
      </Field>);
    }}
  </BriefFormContext.Consumer>);
});
