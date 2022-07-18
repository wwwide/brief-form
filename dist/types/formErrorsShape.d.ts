/**
 * Form errors. Should keep same fields as form value,
 */
export declare type FormErrorsShape<FormShape> = {
    [key in keyof Partial<FormShape>]: string | undefined;
};
