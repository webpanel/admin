import * as React from 'react';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { Entity } from './Entity';
import { ValidationRule } from 'antd/lib/form/Form';
import { Thunk } from 'ts-thunk';
import { InputProps } from 'antd/lib/input';
declare type FieldSections = 'list' | 'detail' | 'edit' | 'search' | 'custom';
export interface IEntityFieldConfig<T> {
    title?: Thunk<string>;
    enabled?: Thunk<boolean>;
    visible?: Thunk<FieldSections[]>;
    hidden?: Thunk<FieldSections[]>;
    render?: (record: T) => React.ReactNode;
    rules?: Thunk<ValidationRule[]>;
    attributes?: InputProps;
}
export declare class EntityField<T, C extends IEntityFieldConfig<T>> {
    readonly name: string;
    protected readonly config: C;
    readonly entity: Entity<any>;
    constructor(name: string, config: C, entity: Entity<any>);
    readonly title: string;
    readonly columnName: string;
    readonly fetchField: string;
    visible(section: FieldSections, strict?: boolean): boolean;
    readonly render: ((record: T) => React.ReactNode);
    inputElement(props?: {
        value?: any;
        onChange?: (value: any) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
    readonly valuePropName: string;
    fieldElement(field: EntityField<T, C>, formContext: FormContext, key: string | number): React.ReactNode;
}
export {};
