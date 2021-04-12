import * as React from 'react';
import { FormContextShape, FormValuesShape, FormErrorsShape, FormFieldProps } from '../types';

export const BriefFormContext = React.createContext<FormContextShape>({
  value: {},
  errors: {},
  components: {},
  field: (props: FormFieldProps) => { return null; },
  onChange: (value: FormValuesShape, errors: FormErrorsShape) => { return; },
});
