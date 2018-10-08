import * as React from 'react';
export interface IEntityFieldTextFieldInput {
    type?: 'string' | 'number' | 'text' | 'date' | 'datetime';
}
export interface IEntityFieldBaseConfig<T> {
    name: string;
    title?: string;
    visibility?: {
        list?: boolean;
        detail?: boolean;
    };
    render?: (text: any, record: T, index: number) => React.ReactNode;
}
export declare type IEntityFieldConfig<T> = IEntityFieldBaseConfig<T> & IEntityFieldTextFieldInput;
export declare class EntityField<T> {
    private readonly config;
    constructor(config: IEntityFieldConfig<T>);
    readonly title: string;
    readonly name: string;
    readonly render: ((text: any, record: any, index: number) => React.ReactNode) | undefined;
    visible(type: 'list' | 'detail'): boolean;
    inputElement(): React.ReactNode;
}
