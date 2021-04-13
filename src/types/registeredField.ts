export type RegisteredField = {
  name: string;
  required: boolean;
  validator?: (v: any, f: any) => string | undefined;
};
