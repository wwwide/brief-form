import * as React from 'react';

export type RegisteredField = {
  name: string;
  ref: React.RefObject<any>;
  required: boolean;
  validator?: (v: any, f: any) => string | undefined;
};
