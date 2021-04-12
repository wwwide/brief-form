import * as React from 'react';
import { FormContextShape } from '../types';

export const BriefFormContext = React.createContext<FormContextShape>({
  value: {},
  errors: {},
  components: {},
  field: () => { return null; },
  onChange: () => { return; },
});
