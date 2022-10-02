import React, { FC } from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Form, FormProvider } from '../components'
import { FormInputProps, FormFieldProps } from '../types'
import { useFormData } from '../hooks'
import { FieldRenderer, FormInput } from '../utils'

export default {
  title: 'Form',
  component: Form
} as Meta

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
            input={FormInput}
            validator={(v) => (v.length < 3 ? 'Name too short' : undefined)}
            inputProps={{
              testId: ''
            }}
          />
          <Field required name="age" label="Age" input={FormInput} inputProps={{ testId: '' }} />
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
