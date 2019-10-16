import * as React from 'react';
import { FormLayout, ValidationRule } from 'antd/lib/form/Form';
import { Thunk } from 'ts-thunk';
import { Entity } from './Entity';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { InputProps } from 'antd/lib/input';
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
    description?: React.ReactNode;
    shortTitle?: Thunk<string>;
    enabled?: Thunk<boolean>;
    readable?: Thunk<boolean>;
    writable?: Thunk<boolean>;
    render?: (record: T) => React.ReactNode;
    rules?: Thunk<ValidationRule[]>;
    attributes?: InputProps;
    sortable?: boolean | {
        fields: string[];
    };
    filter?: IEntityFieldConfigFilter | boolean;
}
export declare class EntityField<T, C extends IEntityFieldConfig<T>> {
    readonly name: string;
    protected readonly config: C;
    readonly entity: Entity;
    constructor(name: string, config: C, entity: Entity);
    readonly title: string;
    readonly shortTitle: string;
    columnName(): string;
    fetchField(): string | null;
    readonly sortable: boolean;
    sortColumns(): string[];
    readonly filter: boolean;
    readonly range: boolean;
    readonly filterNormalize: (values: any[]) => {
        [key: string]: any;
    };
    readonly filterDenormalize: (values: {
        [key: string]: any;
    }) => any[];
    readonly enabled: boolean;
    readonly readable: boolean;
    readonly writeable: boolean;
    readonly render: (record: T) => React.ReactNode;
    inputElement(props?: {
        value?: any;
        onChange?: (value: any, stringValue: string) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
    readonly valuePropName: string;
    fieldElement(formContext: FormContext, key: string | number, config: {
        formLayout?: FormLayout;
    }): React.ReactNode;
    filterDropdownInput: (props: IEntityFieldFilterProps<any>) => React.ReactNode;
    filterDropdown: (resource: any) => (props: IEntityFieldFilterProps<any>) => JSX.Element;
}
