import * as React from 'react';
export interface IEntityFieldTextFieldInput {
    type: 'string' | 'number' | 'text' | 'date' | 'datetime';
}
export interface IEntityFieldConfig {
    name: string;
    title?: string;
    visibility?: {
        list?: boolean;
        detail?: boolean;
    };
    input: IEntityFieldTextFieldInput;
}
export declare class EntityField {
    private readonly config;
    constructor(config: IEntityFieldConfig);
    readonly title: string;
    readonly name: string;
    visible(type: 'list' | 'detail'): boolean;
    inputElement(): React.ReactNode;
}
