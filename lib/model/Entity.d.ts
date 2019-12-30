import * as React from "react";
import { CreateEntityProps } from "../components/buttons/EntityAddButton";
import { DataSource, ResourceCollection, ResourceID, SortInfo } from "webpanel-data";
import { DetailEntityProps } from "../components/buttons/EntityDetailButton";
import { IEntityEditLayoutProps } from "../components/layouts/entity.edit";
import { EntityField, IEntityFieldConfig } from "./EntityField";
import { IEntityFieldBooleanConfig } from "./fields/EntityFieldBoolean";
import { IEntityFieldComputedConfig } from "./fields/EntityFieldComputed";
import { IEntityFieldCustomConfig } from "./fields/EntityFieldCustom";
import { IEntityFieldDateConfig } from "./fields/EntityFieldDate";
import { IEntityFieldEnumConfig } from "./fields/EntityFieldEnum";
import { IEntityFieldFileConfig } from "./fields/EntityFieldFile";
import { IEntityFieldRelationshipConfig } from "./fields/EntityFieldRelationship";
import { IEntityListConfig } from "../components/pages/list";
import { EntityOnSaveHandler, IEntityEditConfig } from "../components/pages/edit";
import { IEntityDetailConfig, IEntityDetailProps } from "../components/pages/detail";
import { Thunk } from "ts-thunk";
import { DataSourceArgumentMap } from "webpanel-data/lib/DataSource";
import { LayoutBuilder } from "../layout-builder";
import { LayoutBuilderConfig } from "../layout-builder/builder";
import { ResourceCollectionLayerProps } from "webpanel-data/lib/components/ResourceCollectionLayer";
interface IEntitySearchableConfig {
    fields: Thunk<string[]>;
}
export interface IEntityConfig<T> {
    name: Thunk<string>;
    pathPrefix?: Thunk<string>;
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
    list?: Thunk<IEntityListConfig<T>>;
    edit?: Thunk<IEntityEditConfig>;
    detail?: Thunk<IEntityDetailConfig>;
    searchable?: Thunk<boolean | IEntitySearchableConfig>;
    render?: (value: T | null) => React.ReactNode;
    initialSorting?: SortInfo[];
    initialFilters?: DataSourceArgumentMap;
}
export declare class Entity<T = any> {
    private readonly config;
    fields: EntityField<T, any>[];
    autopermissions?: boolean;
    constructor(config: IEntityConfig<T>);
    get structureName(): string;
    get title(): string;
    get enabled(): boolean;
    get creatable(): boolean;
    get updateable(): boolean;
    get deletable(): boolean;
    get showDetailPage(): boolean;
    get name(): string;
    get dataSource(): DataSource;
    get render(): (value: T | null) => React.ReactNode;
    get initialSorting(): SortInfo[] | undefined;
    get initialFilters(): DataSourceArgumentMap | undefined;
    get searchable(): boolean;
    getField(name: string): EntityField<T, any> | null;
    getFieldOrFail(name: string): EntityField<T, any>;
    get listFields(): EntityField<T, any>[];
    get editFields(): EntityField<T, any>[];
    get detailFields(): EntityField<T, any>[];
    get searchableFields(): EntityField<T, any>[];
    get detailLayout(): ((props: IEntityDetailProps) => React.ReactNode) | undefined;
    get editLayout(): ((props: IEntityEditLayoutProps, resourceID: ResourceID) => React.ReactNode) | undefined;
    get createLayout(): ((props: IEntityEditLayoutProps) => React.ReactNode) | undefined;
    private layouts;
    setLayout: (type: "detail" | "edit", fn: (builder: LayoutBuilder) => React.ReactNode) => void;
    getLayout(type: "detail" | "edit", config: LayoutBuilderConfig): React.ReactNode | null;
    menuItem: () => React.ReactNode;
    structureItem: () => React.ReactNode;
    private getDetailPageLayout;
    private handleFormOnSave;
    private getEditPageLayout;
    private getCreatePageLayout;
    getListView: (config?: IEntityListConfig<T> | undefined) => React.ReactNode;
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
    getSearchResourceCollectionLayer: (render: (collection: ResourceCollection<T, import("webpanel-data/lib/ResourceCollection").ResourceCollectionConfig<T>>) => React.ReactNode, props?: Partial<ResourceCollectionLayerProps<any>> | undefined) => React.ReactNode;
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
    customField(name: string, config: IEntityFieldCustomConfig<T>): Entity<T>;
    getListLink(): string;
    getCreateLink(): string;
    getDetailLink(id: ResourceID): string;
    getEditLink(id: ResourceID): string;
}
export {};
