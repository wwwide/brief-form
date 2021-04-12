import * as React from "react";
import { FormValuesShape } from "./formValuesShape";
import { FormErrorsShape } from "./formErrorsShape";
import { FormInputProps } from "./formInputProps";
import { FormFieldProps } from "./formFieldProps";

export type FormContextShape = {
  value: { [key: string]: any };
  errors: { [key: string]: any };
  onChange: (value: FormValuesShape, errors: FormErrorsShape) => void;
  components: { [key: string]: React.ComponentType<FormInputProps> };
  field: React.ComponentType<FormFieldProps>;
}
