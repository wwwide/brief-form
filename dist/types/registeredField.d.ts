export declare type RegisteredField = {
    name: string;
    required: boolean;
    getError: (v: any, required: boolean) => string | undefined;
    validator?: (v: any, f: any) => string | undefined;
};
