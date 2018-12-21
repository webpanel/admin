import * as React from 'react';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { Entity } from './Entity';
import { ValidationRule, FormLayout } from 'antd/lib/form/Form';
import { Thunk } from 'ts-thunk';
import { InputProps } from 'antd/lib/input';
import { FieldAction } from './permissions';
export declare type FieldSections = 'list' | 'detail' | 'edit' | 'search' | 'custom';
export interface IEntityFieldFilterProps<T> {
    selectedKeys: T[];
    setSelectedKeys: (keys: T[]) => {};
    confirm: () => {};
    clearFilters: () => {};
}
export interface IEntityFieldConfigFilter {
    range?: boolean;
}
export interface IEntityFieldConfig<T> {
    title?: Thunk<string>;
    shortTitle?: Thunk<string>;
    enabled?: Thunk<boolean>;
    listEditable?: Thunk<boolean>;
    visible?: Thunk<FieldSections[]>;
    hidden?: Thunk<FieldSections[]>;
    render?: (record: T) => React.ReactNode;
    rules?: Thunk<ValidationRule[]>;
    attributes?: InputProps;
    sortable?: boolean;
    filter?: IEntityFieldConfigFilter | boolean;
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
    readonly filterFormatter: ((values: any[]) => {
        [key: string]: any;
    });
    visible(section: FieldSections, action: FieldAction, strict?: boolean): boolean;
    readonly render: ((record: T) => React.ReactNode);
    inputElement(props?: {
        value?: any;
        onChange?: (value: any, stringValue: string) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
    readonly valuePropName: string;
    fieldElement(formContext: FormContext, key: string | number, config: {
        formLayout?: FormLayout;
    }): React.ReactNode;
    filterDropdownInput: (props: IEntityFieldFilterProps<any>) => JSX.Element;
    filterDropdown: (resource: any) => (props: IEntityFieldFilterProps<any>) => JSX.Element;
}
