import * as React from "react";
import { FormInstance, FormLayout } from "antd/lib/form/Form";
import { InputProps } from "antd/lib/input";
import { ResourceTableFilterDenormalizer, ResourceTableFilterNormalizer } from "webpanel-antd";
import { Thunk } from "ts-thunk";
import { Entity } from "./Entity";
import { IEntityListColumnAlign } from "../components/pages/list";
import { Rule } from "rc-field-form/es/interface";
import { EntityBase } from "./EntityBase";
export declare type FieldSections = "list" | "detail" | "edit" | "search" | "custom";
export interface IEntityFieldFilterProps<T> {
    selectedKeys: T[];
    setSelectedKeys: (keys: T[]) => {};
    confirm: () => {};
    clearFilters: () => {};
}
export interface IEntityFieldInputElementProps<T = any> {
    value?: T;
    onChange?: (value?: T, stringValue?: React.ReactNode) => void;
    autoFocus?: boolean;
    values?: any;
    formInstance?: FormInstance;
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
    description?: Thunk<React.ReactNode>;
    shortTitle?: Thunk<string>;
    enabled?: Thunk<boolean>;
    readable?: Thunk<boolean>;
    writable?: Thunk<boolean, T>;
    render?: (record: T, options?: IEntityFieldRenderOptions) => React.ReactNode;
    rules?: Thunk<Rule[]>;
    dependencies?: Thunk<string[]>;
    attributes?: InputProps;
    sortable?: boolean | {
        fields: string[];
    };
    filter?: IEntityFieldConfigFilter | boolean;
    listColumnAlign?: IEntityListColumnAlign;
}
export declare class EntityField<T, C extends IEntityFieldConfig<T>> {
    readonly name: string;
    protected readonly config: C;
    protected readonly _entity: EntityBase;
    constructor(name: string, config: C, _entity: EntityBase);
    clone(entity?: Entity): this;
    get titleTranslationKey(): string;
    get entity(): Entity<any>;
    get title(): string;
    get shortTitle(): string;
    get listColumnAlign(): IEntityListColumnAlign;
    columnName(): string;
    fetchField(): string | null;
    editFetchField(): string;
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
    isWriteable(values?: T): boolean;
    get render(): (record: T, options?: IEntityFieldRenderOptions) => React.ReactNode;
    setRender(fn: (record: T, options?: IEntityFieldRenderOptions) => React.ReactNode): void;
    inputElement(props?: IEntityFieldInputElementProps): React.ReactNode;
    get valuePropName(): string;
    fieldElement(key: string | number, config: {
        formLayout?: FormLayout;
        formInstance?: FormInstance;
    }, values?: any): React.ReactNode;
    filterDropdownInput: (props: IEntityFieldFilterProps<any>) => React.ReactNode;
    protected _filterDropdownInput: (props: IEntityFieldFilterProps<any>) => React.ReactNode;
    filterDropdown: (resource: any) => (props: IEntityFieldFilterProps<any>) => JSX.Element;
}
