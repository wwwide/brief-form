/**
 * Field metadata.
 */
export declare type RegisteredField<FormShape> = {
    validator?: (v: any, f: FormShape) => string | undefined;
};
