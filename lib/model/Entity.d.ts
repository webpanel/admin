import * as React from "react";
import { CreateEntityProps } from "../components/buttons/EntityAddButton";
import { DataSource, Resource, ResourceCollectionHookConfig, ResourceHookConfig, ResourceID, SortInfo } from "webpanel-data";
import { DetailEntityProps } from "../components/buttons/EntityDetailButton";
import { IEntityDetailConfig, IEntityDetailProps } from "../components/pages/detail";
import { IEntityCreateProps, IEntityEditConfig, IEntityEditProps } from "../components/pages/edit";
import { EntityField, IEntityFieldConfig, IEntityFieldRenderOptions } from "./EntityField";
import { IEntityFieldBooleanConfig } from "./fields/EntityFieldBoolean";
import { IEntityFieldComputedConfig } from "./fields/EntityFieldComputed";
import { IEntityFieldCustomConfig } from "./fields/EntityFieldCustom";
import { IEntityFieldDateConfig } from "./fields/EntityFieldDate";
import { IEntityFieldEnumConfig } from "./fields/EntityFieldEnum";
import { IEntityFieldFileConfig } from "./fields/EntityFieldFile";
import { IEntityFieldNumberConfig } from "./fields/EntityFieldNumber";
import { IEntityFieldPercentageConfig } from "./fields/EntityFieldPercentage";
import { IEntityFieldRelationshipConfig } from "./fields/EntityFieldRelationship";
import { IEntityListConfig } from "../components/pages/list";
import { EntitySelectConfig } from "../components/entity-picker";
import { ResourceCollection, ResourceCollectionConfig } from "webpanel-data/lib/ResourceCollection";
import { Thunk } from "ts-thunk";
import { DataSourceArgumentMap } from "webpanel-data/lib/DataSource";
import { LayoutBuilder } from "../layout-builder";
import { LayoutBuilderConfig } from "../layout-builder/builder";
import { MenuItemProps } from "antd/lib/menu/MenuItem";
import { StructureItemProps } from "webpanel-antd/lib/layout/Structure";
declare type MergeEntityFieldType<T, U, T0 = T & U, T1 = {
    [K in keyof T0]: T0[K];
}> = T1;
export declare type EntityDataType = {
    id: ResourceID;
};
declare type UnwrapEntity<T> = T extends Entity<infer U> ? U : never;
interface IEntitySearchableConfig {
    fields: Thunk<string[]>;
}
interface IEntityDetailOptions<T extends EntityDataType> {
    entity: Entity<T>;
    resourceID: ResourceID;
}
interface IEntityEditOptions<T extends EntityDataType> {
    entity: Entity<T>;
    resourceID?: ResourceID;
}
declare type ILayoutGetter<T> = (props: T) => React.ReactNode;
export interface IEntityConfig<T extends EntityDataType> {
    name: Thunk<string>;
    pathPrefix?: Thunk<string>;
    icon?: Thunk<React.ReactNode>;
    dataSource: Thunk<DataSource>;
    title?: Thunk<string>;
    enabled?: Thunk<boolean>;
    creatable?: Thunk<boolean>;
    updateable?: Thunk<boolean, T>;
    deletable?: Thunk<boolean, T>;
    showDetailPage?: Thunk<boolean>;
    layouts?: Thunk<{
        detail?: ILayoutGetter<IEntityDetailProps>;
        edit?: ILayoutGetter<IEntityEditProps>;
        create?: ILayoutGetter<IEntityCreateProps>;
    }>;
    menu?: Thunk<Partial<MenuItemProps & {
        key: string;
    }>>;
    structure?: Thunk<Partial<StructureItemProps & {
        key: string;
    }>>;
    list?: Thunk<IEntityListConfig<T>>;
    edit?: Thunk<IEntityEditConfig, IEntityEditOptions<T>>;
    detail?: Thunk<IEntityDetailConfig, IEntityDetailOptions<T>>;
    searchable?: Thunk<boolean | IEntitySearchableConfig>;
    render?: (value: T | null) => React.ReactNode;
    initialSorting?: SortInfo[];
    initialFilters?: DataSourceArgumentMap;
}
export declare class Entity<T extends EntityDataType = {
    id: ResourceID;
}> {
    private config;
    fields: EntityField<any, any>[];
    autopermissions?: boolean;
    constructor(config: IEntityConfig<T>);
    updateConfig(config: Partial<IEntityConfig<T>>): this;
    get structureName(): string;
    get title(): string;
    get enabled(): boolean;
    get creatable(): boolean;
    updateable(values: T): boolean;
    deletable(values: T): boolean;
    get showDetailPage(): boolean;
    get name(): string;
    get dataSource(): DataSource;
    getListConfig(): IEntityListConfig<T> | undefined;
    getEditConfig(resourceID?: ResourceID): IEntityEditConfig | undefined;
    getDetailConfig(resourceID: ResourceID): IEntityDetailConfig | undefined;
    get render(): (value: T | null) => React.ReactNode;
    setRender(fn: (value: T) => React.ReactNode): this;
    get initialSorting(): SortInfo[] | undefined;
    get initialFilters(): DataSourceArgumentMap | undefined;
    get searchable(): boolean;
    getField(name: string): EntityField<T, any> | null;
    getFieldOrFail(name: string): EntityField<T, any>;
    getListFields(): EntityField<T, any>[];
    getEditFields(resourceID?: ResourceID): EntityField<T, any>[];
    getDetailFields(resourceID: ResourceID): EntityField<T, any>[];
    get searchableFields(): EntityField<T, any>[];
    get detailLayout(): ILayoutGetter<IEntityDetailProps> | undefined;
    get editLayout(): ILayoutGetter<IEntityEditProps> | undefined;
    get createLayout(): ILayoutGetter<IEntityCreateProps> | undefined;
    setDetailLayout(fn: ILayoutGetter<IEntityDetailProps>): void;
    setEditLayout(fn: ILayoutGetter<IEntityEditProps>): void;
    setCreateLayout(fn: ILayoutGetter<IEntityCreateProps>): void;
    private cardLayouts;
    setCardLayout: (type: "detail" | "edit", fn: (builder: LayoutBuilder) => React.ReactNode) => void;
    getCardLayout(type: "detail" | "edit", config: LayoutBuilderConfig & (IEntityDetailConfig | IEntityEditConfig)): React.ReactNode;
    menuItem: () => React.ReactNode;
    structureItem: () => React.ReactNode;
    private getDetailPageLayout;
    private handleFormOnSave;
    private getEditPageLayout;
    private getCreatePageLayout;
    getListView: (config?: Thunk<IEntityListConfig<T>, undefined> | undefined) => React.ReactNode;
    getDetailView: (resourceID: ResourceID, config?: IEntityDetailConfig | undefined) => React.ReactNode;
    getDetailButton: (id: ResourceID, props: DetailEntityProps) => React.ReactNode;
    getCreateView: (props?: Omit<IEntityCreateProps, "entity"> | undefined) => React.ReactNode;
    getCreateButton: (props: Omit<CreateEntityProps, "entity">) => React.ReactNode;
    getEditView: (props: Omit<IEntityEditProps, "entity">) => React.ReactNode;
    getEditButton: (resourceID: ResourceID) => React.ReactNode;
    getSearchResourceCollectionConfig: () => ResourceCollectionConfig<T>;
    getSelect(config?: EntitySelectConfig): React.ReactNode;
    stringField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: string;
    }>>(name: Name, config?: IEntityFieldConfig<T2>): Entity<T2>;
    textField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: string;
    }>>(name: Name, config?: IEntityFieldConfig<T2>): Entity<T2>;
    numberField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: number;
    }>>(name: Name, config?: IEntityFieldNumberConfig<T2>): Entity<T2>;
    percentageField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: number;
    }>>(name: Name, config?: IEntityFieldPercentageConfig<T2>): Entity<T2>;
    passwordField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: string;
    }>>(name: Name, config?: IEntityFieldConfig<T2>): Entity<T2>;
    dateField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: moment.Moment;
    }>>(name: Name, config?: IEntityFieldDateConfig<T2>): Entity<T2>;
    booleanField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: boolean;
    }>>(name: Name, config?: IEntityFieldBooleanConfig<T2>): Entity<T2>;
    relationshipField<Name extends string, T2 extends MergeEntityFieldType<T, EnhancedKeys>, Config extends IEntityFieldRelationshipConfig<EnhancedKeys>, EnhancedKeys = {
        [K in Name]: UnwrapEntity<ReturnType<Config["targetEntity"]>>;
    }>(name: Name, config: Config): Entity<T2>;
    fileField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: any;
    }>>(name: Name, config?: IEntityFieldFileConfig<T>): Entity<T2>;
    colorField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: string;
    }>>(name: Name, config?: IEntityFieldConfig<T2>): Entity<T2>;
    enumField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: string;
    }>>(name: Name, config: IEntityFieldEnumConfig<T2>): Entity<T2>;
    computedField<Name extends string, EnhancedKeys = {
        [K in Name]: any;
    }>(name: Name, config?: IEntityFieldComputedConfig<any>): Entity<T & EnhancedKeys>;
    customField<Name extends string, EnhancedKeys = {
        [K in Name]: any;
    }>(name: Name, config: IEntityFieldCustomConfig<any>): Entity<T & EnhancedKeys>;
    setFieldRender<Name extends keyof T>(name: Name, fn: (record: T, options?: IEntityFieldRenderOptions) => React.ReactNode): this;
    getListLink(): string;
    getCreateLink(): string;
    getDetailLink(id: ResourceID): string;
    getEditLink(id: ResourceID): string;
    useResource(resourceID: ResourceID, config?: Partial<ResourceHookConfig<T>>): Resource<T>;
    useResourceCollection(config?: Partial<ResourceCollectionHookConfig<T>>): ResourceCollection<T>;
}
export {};
