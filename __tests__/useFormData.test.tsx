import React from 'react'
import TestRenderer from 'react-test-renderer'
import userEvent from '@testing-library/user-event'
import { render, renderHook, waitFor } from '@testing-library/react'
import { BeforeFormChangeHandler, FormErrorsShape, FormProvider } from '../src'
import { useFormData } from '../src/hooks'
import { FormInput, FieldRenderer } from '../src/utils'

const { act } = TestRenderer

type MyForm = {
  name: string
  age: string
}

const InitialValue: MyForm = {
  name: 'Andre',
  age: '18'
}

const InitialValue2: MyForm = {
  name: 'Andre',
  age: '37'
}

const InitialErrors = { age: 'Too old!' }

describe('useFormData works properly', () => {
  test('Check initial data returned by hook', async () => {
    const formHook = renderHook(() => useFormData<MyForm>({ initialValue: InitialValue, initialErrors: InitialErrors }))
    await waitFor(() => expect(formHook.result.current).toBeTruthy())

    // Form initially is not dirty
    expect(formHook.result.current.isDirty).toBeFalsy()

    // Form initially is not valid, because we passed initial errors object into it.
    expect(formHook.result.current.isValid).toBeFalsy()

    // Value is equal to initial.
    expect(formHook.result.current.config.value).toEqual(InitialValue)

    // Errors is equal to initial.
    expect(formHook.result.current.config.errors).toEqual(InitialErrors)

    // Check initial registered fields state.
    expect(formHook.result.current.config.registeredFields).toEqual({ current: { name: undefined, age: undefined } })

    // Config object contains onChange handler.
    expect(formHook.result.current.config.onChange).toBeDefined()
  })

  test('Check initial data returned by hook with rendered form', async () => {
    const formHook = renderHook(() => useFormData<MyForm>({ initialValue: InitialValue, initialErrors: InitialErrors }))

    await waitFor(() => expect(formHook.result.current).toBeTruthy())

    const { Field, Form, config } = formHook.result.current

    render(
      <FormProvider crashIfRequiredFieldDoesNotHaveValidator fieldRenderer={FieldRenderer}>
        <Form config={config}>
          <input data-testid="iii" defaultValue="18" />
          <Field name="name" label="Name" input={FormInput} inputProps={{ testId: 'name' }} />
          <Field
            required
            name="age"
            label="Age"
            input={FormInput}
            validator={(v) => (v === '18' ? undefined : 'Not ideal')}
            inputProps={{ testId: 'age' }}
          />
          <button data-testid="button">ok</button>
        </Form>
      </FormProvider>
    )

    // Name field doesn't have validator.
    expect(config.registeredFields.current?.name.validator).toEqual(undefined)

    // Age field provides validator and it's stored to our meta.
    expect(config.registeredFields.current?.age.validator).toBeDefined()
  })

  test('Check how onChange and field validators work', async () => {
    const formHook = renderHook(() => useFormData<MyForm>({ initialValue: InitialValue, initialErrors: InitialErrors }))

    await waitFor(() => expect(formHook.result.current).toBeTruthy())

    const { Field, Form, config } = formHook.result.current

    const form = render(
      <FormProvider crashIfRequiredFieldDoesNotHaveValidator fieldRenderer={FieldRenderer}>
        <Form config={config}>
          <input data-testid="iii" defaultValue="18" />
          <Field name="name" label="Name" input={FormInput} inputProps={{ testId: 'name' }} />
          <Field
            required
            name="age"
            label="Age"
            input={FormInput}
            validator={(v) => (v === '18' ? undefined : 'Not ideal')}
            inputProps={{ testId: 'age' }}
          />
          <button data-testid="button">ok</button>
        </Form>
      </FormProvider>
    )

    const ageField = form.getByTestId('age') as HTMLInputElement

    await act(async () => {
      await userEvent.type(ageField, '3')
    })

    await waitFor(() => expect(formHook.result.current.config.value.age).toEqual('183'))

    // Check that age value is updated
    expect(formHook.result.current.config.value.age).toBe('183')

    // Check that validator returns error.
    expect(formHook.result.current.config.errors.age).toBe('Not ideal')

    // Form becomes dirty after change.
    expect(formHook.result.current.isDirty).toEqual(true)

    // We have error on "age" field.
    expect(formHook.result.current.isValid).toEqual(false)
  })

  test('"reset" and "validate" methods work as expected', async () => {
    const formHook = renderHook(() => useFormData<MyForm>({ initialValue: InitialValue, initialErrors: InitialErrors }))

    await waitFor(() => expect(formHook.result.current).toBeTruthy())

    const { Form, Field, config } = formHook.result.current

    const form = render(
      <FormProvider crashIfRequiredFieldDoesNotHaveValidator fieldRenderer={FieldRenderer}>
        <Form config={config}>
          <input data-testid="iii" defaultValue="18" />
          <Field name="name" label="Name" input={FormInput} inputProps={{ testId: 'name' }} />
          <Field
            required
            name="age"
            label="Age"
            input={FormInput}
            validator={(v) => (v === '18' ? undefined : 'Not ideal')}
            inputProps={{ testId: 'age' }}
            triggerValidatorBy={['name']}
          />
          <button data-testid="button">ok</button>
        </Form>
      </FormProvider>
    )

    const ageField = form.getByTestId('age') as HTMLInputElement

    await act(async () => {
      await userEvent.type(ageField, '3')
    })

    await waitFor(() => expect(formHook.result.current.config.value.age).toEqual('183'))

    const {
      config: { onChange, errors },
      set,
      validate
    } = formHook.result.current

    const payload = { name: 'A', age: 'B' }

    act(() => {
      set({ reset: true })
    })

    await waitFor(() =>
      expect(
        formHook.result.current.config.value.name === InitialValue.name &&
          formHook.result.current.config.value.age == InitialValue.age
      ).toBeTruthy()
    )

    // Form value is equal to initial now
    expect(formHook.result.current.config.value.name).toEqual(InitialValue.name)
    expect(formHook.result.current.config.value.age).toEqual(InitialValue.age)

    act(() => {
      onChange(payload, errors)
    })

    await waitFor(() =>
      expect(
        formHook.result.current.config.value.name == 'A' && formHook.result.current.config.value.age == 'B'
      ).toBeTruthy()
    )

    const payload2 = { name: 'C', age: 'D' }
    const errors2 = { name: 'error1', age: 'error2' }

    act(() => {
      set({ value: payload2, errors: errors2, reset: true })
    })

    await waitFor(() =>
      expect(
        formHook.result.current.config.value.name === payload2.name &&
          formHook.result.current.config.value.age == payload2.age
      ).toBeTruthy()
    )

    // Form value is equal to payload2 and errors are equal to errors2
    expect(formHook.result.current.config.value.name).toEqual(payload2.name)
    expect(formHook.result.current.config.value.age).toEqual(payload2.age)
    expect(formHook.result.current.isDirty).toBeFalsy()
    expect(formHook.result.current.isValid).toBeFalsy()

    act(() => {
      onChange(payload, errors)
    })

    await waitFor(() =>
      expect(
        formHook.result.current.config.value.name == 'A' && formHook.result.current.config.value.age == 'B'
      ).toBeTruthy()
    )

    const errors3 = validate()

    expect(errors3.errors.age).toEqual('Not ideal')
    expect(errors3.valid).toEqual(false)
  })

  test('Validation of dependent fields works correctly', async () => {
    const formHook = renderHook(() =>
      useFormData<MyForm>({ initialValue: InitialValue2, initialErrors: InitialErrors })
    )

    await waitFor(() => expect(formHook.result.current).toBeTruthy())

    const { Form, Field, config } = formHook.result.current

    const form = render(
      <FormProvider crashIfRequiredFieldDoesNotHaveValidator fieldRenderer={FieldRenderer}>
        <Form config={config}>
          <Field name="name" label="Name" input={FormInput} inputProps={{ testId: 'name' }} />
          <Field
            required
            name="age"
            label="Age"
            input={FormInput}
            validator={(v, f) => (v === '37' && f.name === 'Andrey' ? 'How did you find me?' : undefined)}
            inputProps={{ testId: 'age' }}
            triggerValidatorBy={['name']}
          />
          <button data-testid="button">ok</button>
        </Form>
      </FormProvider>
    )

    const nameField = form.getByTestId('name') as HTMLInputElement

    await act(async () => {
      await userEvent.type(nameField, 'y')
    })

    await waitFor(() => expect(formHook.result.current.config.value.name).toEqual('Andrey'))
    expect(formHook.result.current.config.errors.age).toEqual('How did you find me?')

    await act(async () => {
      await userEvent.type(nameField, 'x')
    })

    expect(formHook.result.current.config.errors.age).toEqual(undefined)
  })

  test('Optional onFormChanged callback called with proper arguments', async () => {
    const mockChanged = jest.fn((v: any, e: any) => {})

    const formHook = renderHook(() =>
      useFormData<MyForm>({ initialValue: InitialValue, initialErrors: InitialErrors, onFormChanged: mockChanged })
    )

    await waitFor(() => expect(formHook.result.current).toBeTruthy())

    const { Form, Field, config } = formHook.result.current

    const form = render(
      <FormProvider crashIfRequiredFieldDoesNotHaveValidator fieldRenderer={FieldRenderer}>
        <Form config={config}>
          <Field name="name" label="Name" input={FormInput} inputProps={{ testId: 'name' }} />
          <button data-testid="button">ok</button>
        </Form>
      </FormProvider>
    )

    const nameField = form.getByTestId('name') as HTMLInputElement

    await act(async () => {
      await userEvent.type(nameField, 'y')
    })

    expect(mockChanged.mock.calls).toHaveLength(1)
    expect(mockChanged.mock.calls[0][0]).toStrictEqual({ ...InitialValue, name: 'Andrey' })
  })

  test('Optional onBeforeChange callback called with proper arguments and transforms value and errors as expected', async () => {
    const mockBeforeChange = jest.fn(({ value, errors }) => {
      const valueCopy = { ...value }
      const errorsCopy = { ...errors }

      if (valueCopy.name === 'Andrey') {
        valueCopy.name = 'Andrey Barkanov'
        errorsCopy.age = 'Too young'
      }

      return { value: valueCopy, errors: errorsCopy }
    })

    const formHook = renderHook(() =>
      useFormData<MyForm>({
        initialValue: InitialValue,
        initialErrors: InitialErrors,
        onBeforeChange: mockBeforeChange
      })
    )

    await waitFor(() => expect(formHook.result.current).toBeTruthy())

    const { Form, Field, config } = formHook.result.current

    const form = render(
      <FormProvider crashIfRequiredFieldDoesNotHaveValidator fieldRenderer={FieldRenderer}>
        <Form config={config}>
          <Field name="name" label="Name" input={FormInput} inputProps={{ testId: 'name' }} />
          <button data-testid="button">ok</button>
        </Form>
      </FormProvider>
    )

    const nameField = form.getByTestId('name') as HTMLInputElement

    await act(async () => {
      await userEvent.type(nameField, 'y')
    })

    expect(mockBeforeChange.mock.calls).toHaveLength(1)
    expect(mockBeforeChange.mock.calls[0][0].value).toStrictEqual({ ...InitialValue, name: 'Andrey' })

    await waitFor(() => expect(formHook.result.current.config.value.name).toEqual('Andrey Barkanov'))

    expect(formHook.result.current.config.value.name).toEqual('Andrey Barkanov')
    expect(formHook.result.current.config.errors.age).toEqual('Too young')
  })
})
