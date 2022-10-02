# brief-form

`brief-form` is a small React based form management tool. The main package API is `useFormData` hook which provides all necessary form data and service methods. It provides approach to manage form data but it's not bound to any particular UI implementation, so library can be used in web React apps or in the React Native applications.

## Quick usage example

```javascript
import React, { memo } from 'react'
import { FormProvider, useFormData } from 'brief-form'

type MyForm = {
  age: number
  name: string
  happy: boolean
}

const InitialValue = {
  age: 37,
  name: 'Andrey',
  happy: true
}

export const SomeFormComponent = memo(() => {
  const {
    isDirty,  // form value was changed
    isValid,  // form is valid
    validate, // method for form validation
    reset,    // reset form state
    Field,    // Field component to render UI input
    Form,     // Form component
    config    // form configuration object
  } = useFormData<MyForm>()

  return <FormProvider fieldRenderer={FieldRenderer}>
    <Form config={config}>
      <Field
        required
        name="name"
        label="Name"
        input={TextInput}
        validator={(v) => (v.length < 3 ? 'Name too short' : undefined)}
        inputProps={{}}
      />
      <Field 
        name="age" 
        label="Age" 
        input={NumberInput} 
        inputProps={{ type: 'integer' }} 
      />
      <Field 
        name="happy" 
        label="Happy?" 
        input={CheckBoxInput} 
        inputProps={{}} 
      />
    </Form>
  </FormProvider>
})
```

Let's dig into more details!

## Form

Form is a container component holding all UI fields. The only required parameter is `config`. It's value returned from `useFormData` hook. As were mentioned before, library doesn't contain any UI implementations, so we should explicitly define which UI component should render form UI field (basically it should render label, input and error). We can do it through `fieldRenderer` Form parameter to set renderer individually for each form. Or we can use `FormProvider` component and set up this renderer globally for all nested forms.

```javascript
<Form config={config} fieldRenderer={UIField}>
</Form>
```

## FormProvider

FormProvider gives us ability to perform global form setup.

`fieldRenderer` parameter accepts React component to be used for rendering form UI field.

`crashIfRequiredFieldDoesNotHaveValidator` defines whether form should crash if it contains any fields marked as required but not providing validator function. In most cases it helps more quickly find required inputs without validators during development. Basically `required` field property just marks fields as required (e.g. field renderer can draw asterisk near label for these fields). Validator function contains logic defining whether field "empty" or "filled". For example we can think about integer input as empty if its value is 0, but for more complex inputs things may be more complex and ambiguous. That's why we need custom validator here. 

We would recommend always use `FormProvider` component to reduce amount of boilerplate code.

## useFormData

This hook is the main library API.

```javascript
  const formData = useFormData<MyFormType>(initialData, initialErrors)
```

 It expects generic parameter (MyFormType) describing form value shape and two arguments - initial form data (required) and initial form errors (optional).

 Let's take a look at what formData contains:

|Name|Type|Description|
|:---|:----:|:---|
|isDirty|`boolean`|form value was changed|
|isValid|`boolean`|form is valid|
|validate|`(withFormUpdate = false) => { [key: string]: string }`|method for form validation. It returns errors dictionary (if any) or empty object. This function accepts optional boolean parameter **withFormUpdate**. It's false by default. If this parameter is true all errored fields will be highlighted after function execution. We would suggest to use it on form submit to show user all input problems.|
|reset|`(newInitialValue, newErrors) => void`|reset form state, optionally new initial value and errors can be provided. **isDirty** flag is set to false. **isValid** is set dependingly on **newErrors** parameter.|
|Field||component to render UI input. It accepts form data field name, input renderer, validator etc. Look for detailed description in the sections below.|
|Form||Form container component|

We highly recommend to use Form and Field components returned from this hook, as they are already bound to form type passed to hook.

## Field

This component is the main form field data management piece. Its parameters are listed below:

|Name|Required|Type|Description|
|:---|:----:|:---|:---|
|name|**true**|One of the form keys|defines which form data field this UI field should handle|
|required||boolean|Defines whether this field is required|
|error||string|Allows to explicitly set form field error|
|label||`ReactNode`|Defines input label|
|input|**true**|component implementing `FormInputProps<V, P>`|Input component which actually should handle user input. See sections below for more details.|
|validator||`(v,f) => string \| undefined`|Optional validator function. Accepts field and form values as arguments. Returns undefined if field is valid, otherwise error string should be returned.|
|inputProps|**true**|Input specific props dictionary|Each field input accepts FormInputProps, but also can have own specific properties. It's a right place to pass it.|

## Field input component

It were mentioned above, input should implement `FormInputProps<V, P>` interface where `V` is a input value type and `P` is a input specific properties. `FormInputProps` interface described below:

```javascript
export interface FormInputProps<V, P> {
  // input specific properties
  opts: P                                       
  // input value
  value: V                                      
  // value change handler (input specific error can be passed as a second argument)
  onChange: (value: V, error?: string) => void  
  // input error
  error?: string
  // whether input is required
  required?: boolean
}
```

As we can see here, each form input component is given all basic necessarry data to properly display its state and handle value updates.

Let's imagine we want to implement check box list input for our form:

```javascript
import { ReactNode } from 'react'
import { FormInputProps } from 'brief-form'

import { Wrapper } from './styles'

export type CheckBoxListValue = { [key: string]: boolean }

export type CheckBoxLabels = { [key: keyof CheckBoxListValue]: ReactNode }

export type CheckBoxListOpts = {
  labels: CheckBoxLabels
  disabled?: boolean
}

export interface CheckBoxListProps extends FormInputProps<CheckBoxListValue, CheckBoxListOpts> {}

export const CheckBoxList: FC<CheckBoxListProps> = memo((props) => {
  const {
    value, // CheckBoxListValue
    onChange, // (value: CheckBoxListValue, error?: string) => void
    opts: { labels, disabled } // CheckBoxListOpts
  } = props

  return (
    <>
      ...
    </>
  )
})
Footer

```

## P.S

Any suggestions are welcomed. Feel free to contact me by email andrey.barkanov@gmail.com.