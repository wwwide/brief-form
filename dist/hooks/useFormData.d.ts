declare type ReturnType<T, E> = {
    formValue: T;
    formErrors: E;
    onChange: (value: T, errors: E) => void;
    isDirty: boolean;
    isValid: boolean;
};
export declare const useFormData: <T, E>(initial: T, errors?: E | undefined) => ReturnType<T, E>;
export {};
