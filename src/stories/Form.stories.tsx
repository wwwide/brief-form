import React, { FC } from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Form, FormProvider } from '../components'
import { FormInputProps, FormFieldProps } from '../types'
import { useFormData } from '../hooks'

export default {
  title: 'Form',
  component: Form
} as Meta

const FieldRenderer = function <ValueType, InputProps>(props: FormFieldProps<ValueType, InputProps>) {
  const { label, required, error, children } = props

  return (
    <div style={{ marginBottom: '20px' }}>
      {!!label && (
        <div>
          {label}
          {required && <b style={{ color: 'red' }}>*</b>}
        </div>
      )}
      {children}
      {!!error && (
        <div>
          <i>{error}</i>
        </div>
      )}
    </div>
  )
}

const Input: FC<FormInputProps<string, { y: boolean, x: number }>> = (props) => {
  const { value, onChange, opts, ...rest } = props
  console.log(opts);
  
  return <input {...rest} value={value} onChange={(e) => onChange(e.target.value, undefined)} />
}

type SampleForm = {
  name: string
  age: number
}

export const BriefFormSample: Story = () => {
  const { config, validate, isValid, isDirty, Field } = useFormData<SampleForm>({ name: '', age: 0 })

  return (
    <FormProvider fieldRenderer={FieldRenderer}>
      <div style={{ width: '500px', fontFamily: 'sans-serif' }}>
        <Form config={config}>
          <Field
            required
            name="name"
            label="Name"
            input={Input}
            validator={(v) => (v.length < 3 ? 'Name too short' : undefined)}
            inputProps={{
              y: false,
              x: 1,
            }}
          />
          <Field required name="age" label="Age" input={Input} />
          <button
            onClick={() => {
              // eslint-disable-next-line
              console.log(validate(true))
            }}
          >
            Validate!
          </button>
          <button disabled={!isValid || !isDirty}>Submit!</button>
        </Form>
      </div>
    </FormProvider>
  )
}

BriefFormSample.args = {
  value: {
    name: '',
    age: ''
  },
  errors: {
    name: 'Unknown error!'
  }
}
