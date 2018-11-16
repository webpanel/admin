import * as React from 'react';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { Entity } from './Entity';
import { ValidationRule, FormLayout } from 'antd/lib/form/Form';
import { Thunk } from 'ts-thunk';
import { InputProps } from 'antd/lib/input';
import { ResourceCollection } from 'webpanel-data';
export declare type FieldSections = 'list' | 'detail' | 'edit' | 'search' | 'custom';
export declare type FieldPermission = 'read' | 'write';
export interface IEntityFieldConfig<T> {
    title?: Thunk<string>;
    shortTitle?: Thunk<string>;
    enabled?: Thunk<boolean>;
    visible?: Thunk<FieldSections[]>;
    hidden?: Thunk<FieldSections[]>;
    permissions?: Thunk<FieldPermission[]>;
    render?: (record: T) => React.ReactNode;
    rules?: Thunk<ValidationRule[]>;
    attributes?: InputProps;
    sortable?: boolean;
    filter?: boolean;
    range?: boolean;
}
export declare class EntityField<T, C extends IEntityFieldConfig<T>> {
    readonly name: string;
    protected readonly config: C;
    readonly entity: Entity<any>;
    constructor(name: string, config: C, entity: Entity<any>);
    readonly title: string;
    readonly shortTitle: string;
    readonly columnName: string;
    readonly fetchField: string;
    readonly sortable: boolean;
    readonly filter: boolean;
    readonly range: boolean;
    visible(section: FieldSections, strict?: boolean): boolean;
    hasPermission(permission: FieldPermission): boolean;
    readonly render: ((record: T) => React.ReactNode);
    inputElement(props?: {
        value?: any;
        onChange?: (value: any) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
    readonly valuePropName: string;
    updateFilterField: (resource: ResourceCollection, operationName: string, value: string, customName?: string | undefined) => void;
    filterDropdownInput: (resource: ResourceCollection) => JSX.Element;
    filterDropdown: (resource: any) => () => JSX.Element;
    fieldElement(formContext: FormContext, key: string | number, config: {
        formLayout?: FormLayout;
    }): React.ReactNode;
}
