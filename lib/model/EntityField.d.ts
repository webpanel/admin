import * as React from 'react';
import { ResourceTableFilterDenormalizer, ResourceTableFilterNormalizer } from 'webpanel-antd';
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
export interface IEntityFieldInputElementProps<T = any> {
    value?: T;
    onChange?: (value: T, stringValue: string) => void;
    autoFocus?: boolean;
}
export interface IEntityFieldConfigFilter {
    range?: boolean;
    dropdownInput?: (props: IEntityFieldFilterProps<any>) => React.ReactNode;
    normalizer?: ResourceTableFilterNormalizer;
    denormalizer?: ResourceTableFilterDenormalizer;
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
    readonly filterNormalize: ResourceTableFilterNormalizer;
    filterNormalizeFn(): ResourceTableFilterNormalizer;
    readonly filterDenormalize: ResourceTableFilterDenormalizer;
    filterDenormalizeFn(): ResourceTableFilterDenormalizer;
    readonly enabled: boolean;
    readonly readable: boolean;
    readonly writeable: boolean;
    readonly render: (record: T) => React.ReactNode;
    inputElement(props?: IEntityFieldInputElementProps): React.ReactNode;
    readonly valuePropName: string;
    fieldElement(formContext: FormContext, key: string | number, config: {
        formLayout?: FormLayout;
    }): React.ReactNode;
    filterDropdownInput: (props: IEntityFieldFilterProps<any>) => React.ReactNode;
    private _filterDropdownInput;
    filterDropdown: (resource: any) => (props: IEntityFieldFilterProps<any>) => JSX.Element;
}
