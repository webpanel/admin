import * as React from "react";
import { DataSource, SortInfo } from "webpanel-data";
import { IEntityListConfig } from "../components/pages/list";
import { IEntityDetailProps } from "../components/pages/detail";
import { EntityField, IEntityFieldConfig } from "./EntityField";
import { IEntityEditLayoutProps } from "../components/layouts/entity.edit";
import { IEntityFieldDateConfig } from "./fields/EntityFieldDate";
import { IEntityFieldBooleanConfig } from "./fields/EntityFieldBoolean";
import { IEntityFieldRelationshipConfig } from "./fields/EntityFieldRelationship";
import { IEntityFieldEnumConfig } from "./fields/EntityFieldEnum";
import { Thunk } from "ts-thunk";
import { IEntityEditConfig, EntityOnSaveHandler } from "../components/pages/edit";
import { DataSourceArgumentMap } from "webpanel-data/lib/DataSource";
import { LayoutBuilder } from "../layout-builder";
import { LayoutBuilderConfig } from "../layout-builder/builder";
import { IEntityFieldComputedConfig } from "./fields/EntityFieldComputed";
export interface IEntityConfig<T> {
    name: Thunk<string>;
    icon?: Thunk<string>;
    dataSource: Thunk<DataSource>;
    title?: Thunk<string>;
    enabled?: Thunk<boolean>;
    showDetailPage?: Thunk<boolean>;
    layouts?: {
        detail?: (props: IEntityDetailProps) => React.ReactNode;
        edit?: (props: IEntityEditLayoutProps) => React.ReactNode;
        create?: (props: IEntityEditLayoutProps) => React.ReactNode;
    };
    list?: IEntityListConfig;
    edit?: IEntityEditConfig;
    searchable?: boolean;
    initialSorting?: SortInfo[];
    initialFilters?: DataSourceArgumentMap;
    render?: (value: T | null) => string;
}
export declare class Entity<T> {
    private readonly config;
    fields: EntityField<T, any>[];
    autopermissions?: boolean;
    constructor(config: IEntityConfig<T>);
    readonly structureName: string;
    readonly title: string;
    readonly enabled: boolean;
    readonly showDetailPage: boolean;
    readonly name: string;
    readonly dataSource: DataSource;
    readonly render: (value: T | null) => string;
    readonly initialSorting: SortInfo[] | undefined;
    readonly initialFilters: DataSourceArgumentMap | undefined;
    readonly searchable: boolean;
    getField(name: string): EntityField<T, any> | null;
    readonly listFields: EntityField<T, any>[];
    readonly editFields: EntityField<T, any>[];
    readonly detailFields: EntityField<T, any>[];
    readonly searchableFields: EntityField<T, any>[];
    readonly detailLayout: ((props: IEntityDetailProps) => React.ReactNode) | undefined;
    readonly editLayout: ((props: IEntityEditLayoutProps) => React.ReactNode) | undefined;
    readonly createLayout: ((props: IEntityEditLayoutProps) => React.ReactNode) | undefined;
    private layouts;
    setLayout: (type: "detail" | "edit", fn: (builder: LayoutBuilder) => React.ReactNode) => void;
    getLayout(type: "detail" | "edit", config: LayoutBuilderConfig): React.ReactNode | null;
    menuItem: () => React.ReactNode;
    structureItem: () => React.ReactNode;
    private getDetailPageLayout;
    private handleFormOnSave;
    private getEditPageLayout;
    private getCreatePageLayout;
    getListView: (config?: IEntityListConfig | undefined) => React.ReactNode;
    getCreateView: (config?: IEntityEditConfig | undefined, handlers?: {
        onSave?: EntityOnSaveHandler | undefined;
        onCancel?: (() => void) | undefined;
    } | undefined) => React.ReactNode;
    getEditView: (config?: IEntityEditConfig | undefined, resourceID?: string | number | undefined, handlers?: {
        onSave?: EntityOnSaveHandler | undefined;
        onCancel?: (() => void) | undefined;
    } | undefined) => React.ReactNode;
    inputField(name: string, config?: IEntityFieldConfig<T>): Entity<T>;
    textField(name: string, config?: IEntityFieldConfig<T>): Entity<T>;
    numberField(name: string, config?: IEntityFieldConfig<T>): Entity<T>;
    passwordField(name: string, config?: IEntityFieldConfig<T>): Entity<T>;
    dateField(name: string, config?: IEntityFieldDateConfig<T>): Entity<T>;
    booleanField(name: string, config?: IEntityFieldBooleanConfig<T>): Entity<T>;
    relationshipField(name: string, config: IEntityFieldRelationshipConfig<T>): Entity<T>;
    colorField(name: string, config?: IEntityFieldConfig<T>): Entity<T>;
    enumField(name: string, config: IEntityFieldEnumConfig<T>): Entity<T>;
    computedField(name: string, config?: IEntityFieldComputedConfig<T>): Entity<T>;
}
