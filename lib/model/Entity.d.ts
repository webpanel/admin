import * as React from 'react';
import { CreateEntityProps } from '../components/buttons/EntityAddButton';
import { DataSource, ResourceID, SortInfo } from 'webpanel-data';
import { DetailEntityProps } from '../components/buttons/EntityDetailButton';
import { IEntityEditLayoutProps } from '../components/layouts/entity.edit';
import { EntityField, IEntityFieldConfig } from './EntityField';
import { IEntityFieldBooleanConfig } from './fields/EntityFieldBoolean';
import { IEntityFieldComputedConfig } from './fields/EntityFieldComputed';
import { IEntityFieldDateConfig } from './fields/EntityFieldDate';
import { IEntityFieldEnumConfig } from './fields/EntityFieldEnum';
import { IEntityFieldFileConfig } from './fields/EntityFieldFile';
import { IEntityFieldRelationshipConfig } from './fields/EntityFieldRelationship';
import { IEntityListConfig } from '../components/pages/list';
import { EntityOnSaveHandler, IEntityEditConfig } from '../components/pages/edit';
import { IEntityDetailConfig, IEntityDetailProps } from '../components/pages/detail';
import { Thunk } from 'ts-thunk';
import { DataSourceArgumentMap } from 'webpanel-data/lib/DataSource';
import { LayoutBuilder } from '../layout-builder';
import { LayoutBuilderConfig } from '../layout-builder/builder';
interface IEntitySearchableConfig {
    fields: Thunk<string[]>;
}
export interface IEntityConfig<T> {
    name: Thunk<string>;
    icon?: Thunk<string>;
    dataSource: Thunk<DataSource>;
    title?: Thunk<string>;
    enabled?: Thunk<boolean>;
    creatable?: Thunk<boolean>;
    updateable?: Thunk<boolean>;
    deletable?: Thunk<boolean>;
    showDetailPage?: Thunk<boolean>;
    layouts?: Thunk<{
        detail?: (props: IEntityDetailProps) => React.ReactNode;
        edit?: (props: IEntityEditLayoutProps) => React.ReactNode;
        create?: (props: IEntityEditLayoutProps) => React.ReactNode;
    }>;
    list?: Thunk<IEntityListConfig>;
    edit?: Thunk<IEntityEditConfig>;
    detail?: Thunk<IEntityDetailConfig>;
    searchable?: Thunk<boolean | IEntitySearchableConfig>;
    render?: (value: T | null) => string;
    initialSorting?: SortInfo[];
    initialFilters?: DataSourceArgumentMap;
}
export declare class Entity<T = any> {
    private readonly config;
    fields: EntityField<T, any>[];
    autopermissions?: boolean;
    constructor(config: IEntityConfig<T>);
    readonly structureName: string;
    readonly title: string;
    readonly enabled: boolean;
    readonly creatable: boolean;
    readonly updateable: boolean;
    readonly deletable: boolean;
    readonly showDetailPage: boolean;
    readonly name: string;
    readonly dataSource: DataSource;
    readonly render: (value: T | null) => string;
    readonly initialSorting: SortInfo[] | undefined;
    readonly initialFilters: DataSourceArgumentMap | undefined;
    readonly searchable: boolean;
    getField(name: string): EntityField<T, any> | null;
    getFieldOrFail(name: string): EntityField<T, any>;
    readonly listFields: EntityField<T, any>[];
    readonly editFields: EntityField<T, any>[];
    readonly detailFields: EntityField<T, any>[];
    readonly searchableFields: EntityField<T, any>[];
    readonly detailLayout: ((props: IEntityDetailProps) => React.ReactNode) | undefined;
    readonly editLayout: ((props: IEntityEditLayoutProps, resourceID: ResourceID) => React.ReactNode) | undefined;
    readonly createLayout: ((props: IEntityEditLayoutProps) => React.ReactNode) | undefined;
    private layouts;
    setLayout: (type: "edit" | "detail", fn: (builder: LayoutBuilder) => React.ReactNode) => void;
    getLayout(type: 'detail' | 'edit', config: LayoutBuilderConfig): React.ReactNode | null;
    menuItem: () => React.ReactNode;
    structureItem: () => React.ReactNode;
    private getDetailPageLayout;
    private handleFormOnSave;
    private getEditPageLayout;
    private getCreatePageLayout;
    getListView: (config?: IEntityListConfig | undefined) => React.ReactNode;
    getDetailView: (resourceID: React.ReactText, config?: IEntityDetailConfig | undefined) => React.ReactNode;
    getDetailButton: (id: React.ReactText, props: DetailEntityProps) => React.ReactNode;
    getCreateView: (config?: IEntityEditConfig | undefined, handlers?: {
        onSave?: EntityOnSaveHandler | undefined;
        onCancel?: (() => void) | undefined;
    } | undefined) => React.ReactNode;
    getCreateButton: (props: CreateEntityProps) => React.ReactNode;
    getEditView: (resourceID: React.ReactText, config?: IEntityEditConfig | undefined, handlers?: {
        onSave?: EntityOnSaveHandler | undefined;
        onCancel?: (() => void) | undefined;
    } | undefined) => React.ReactNode;
    getEditButton: (resourceID: React.ReactText) => React.ReactNode;
    inputField(name: string, config?: IEntityFieldConfig<T>): Entity<T>;
    stringField(name: string, config?: IEntityFieldConfig<T>): Entity<T>;
    textField(name: string, config?: IEntityFieldConfig<T>): Entity<T>;
    numberField(name: string, config?: IEntityFieldConfig<T>): Entity<T>;
    passwordField(name: string, config?: IEntityFieldConfig<T>): Entity<T>;
    dateField(name: string, config?: IEntityFieldDateConfig<T>): Entity<T>;
    booleanField(name: string, config?: IEntityFieldBooleanConfig<T>): Entity<T>;
    relationshipField(name: string, config: IEntityFieldRelationshipConfig<T>): Entity<T>;
    fileField(name: string, config?: IEntityFieldFileConfig<T>): Entity<T>;
    colorField(name: string, config?: IEntityFieldConfig<T>): Entity<T>;
    enumField(name: string, config: IEntityFieldEnumConfig<T>): Entity<T>;
    computedField(name: string, config?: IEntityFieldComputedConfig<T>): Entity<T>;
    getListLink(): string;
    getCreateLink(): string;
    getDetailLink(id: ResourceID): string;
    getEditLink(id: ResourceID): string;
}
export {};
