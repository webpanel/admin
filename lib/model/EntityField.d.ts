import * as React from "react";
import { ResourceTableFilterDenormalizer, ResourceTableFilterNormalizer } from "webpanel-antd";
import { FormLayout, ValidationRule } from "antd/lib/form/Form";
import { InputProps } from "antd/lib/input";
import { Thunk } from "ts-thunk";
import { Entity } from "./Entity";
import { FormContext } from "webpanel-antd/lib/form/form/Form";
export declare type FieldSections = "list" | "detail" | "edit" | "search" | "custom";
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
export interface IEntityFieldRenderOptions {
    size?: "small" | "medium" | "large";
}
export interface IEntityFieldConfig<T> {
    title?: Thunk<string>;
    description?: React.ReactNode;
    shortTitle?: Thunk<string>;
    enabled?: Thunk<boolean>;
    readable?: Thunk<boolean>;
    writable?: Thunk<boolean>;
    render?: (record: T, options?: IEntityFieldRenderOptions) => React.ReactNode;
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
    get title(): string;
    get shortTitle(): string;
    columnName(): string;
    fetchField(): string | null;
    get sortable(): boolean;
    sortColumns(): string[];
    get filter(): boolean;
    get range(): boolean;
    get filterNormalize(): ResourceTableFilterNormalizer;
    filterNormalizeFn(): ResourceTableFilterNormalizer;
    get filterDenormalize(): ResourceTableFilterDenormalizer;
    filterDenormalizeFn(): ResourceTableFilterDenormalizer;
    get enabled(): boolean;
    get readable(): boolean;
    get writeable(): boolean;
    get render(): (record: T, options?: IEntityFieldRenderOptions) => React.ReactNode;
    inputElement(props?: IEntityFieldInputElementProps): React.ReactNode;
    get valuePropName(): string;
    fieldElement(formContext: FormContext, key: string | number, config: {
        formLayout?: FormLayout;
    }): React.ReactNode;
    filterDropdownInput: (props: IEntityFieldFilterProps<any>) => React.ReactNode;
    protected _filterDropdownInput: (props: IEntityFieldFilterProps<any>) => React.ReactNode;
    filterDropdown: (resource: any) => (props: IEntityFieldFilterProps<any>) => JSX.Element;
}
