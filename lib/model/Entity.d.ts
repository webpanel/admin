import * as React from "react";
import { CreateEntityProps } from "../components/buttons/EntityAddButton";
import { DataSource, ResourceID, SortInfo } from "webpanel-data";
import { DetailEntityProps } from "../components/buttons/EntityDetailButton";
import { IEntityDetailConfig, IEntityDetailProps } from "../components/pages/detail";
import { IEntityCreateProps, IEntityEditConfig, IEntityEditProps } from "../components/pages/edit";
import { EntityField, IEntityFieldConfig } from "./EntityField";
import { IEntityFieldBooleanConfig } from "./fields/EntityFieldBoolean";
import { IEntityFieldComputedConfig } from "./fields/EntityFieldComputed";
import { IEntityFieldCustomConfig } from "./fields/EntityFieldCustom";
import { IEntityFieldDateConfig } from "./fields/EntityFieldDate";
import { IEntityFieldEnumConfig } from "./fields/EntityFieldEnum";
import { IEntityFieldFileConfig } from "./fields/EntityFieldFile";
import { IEntityFieldNumberConfig } from "./fields/EntityFieldNumber";
import { IEntityFieldRelationshipConfig } from "./fields/EntityFieldRelationship";
import { IEntityListConfig } from "../components/pages/list";
import { EntitySelectConfig } from "../components/entity-picker";
import { Thunk } from "ts-thunk";
import { DataSourceArgumentMap } from "webpanel-data/lib/DataSource";
import { LayoutBuilder } from "../layout-builder";
import { LayoutBuilderConfig } from "../layout-builder/builder";
import { MenuItemProps } from "antd/lib/menu/MenuItem";
import { ResourceCollectionConfig } from "webpanel-data/lib/ResourceCollection";
import { StructureItemProps } from "webpanel-antd/lib/layout/Structure";
interface IEntitySearchableConfig {
    fields: Thunk<string[]>;
}
interface IEntityDetailOptions<T extends {
    id: ResourceID;
}> {
    entity: Entity<T>;
    resourceID: ResourceID;
}
interface IEntityEditOptions<T extends {
    id: ResourceID;
}> {
    entity: Entity<T>;
    resourceID?: ResourceID;
}
declare type ILayoutGetter<T> = (props: T) => React.ReactNode;
export interface IEntityConfig<T extends {
    id: ResourceID;
}> {
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
export declare class Entity<T extends {
    id: ResourceID;
} = any> {
    private readonly config;
    fields: EntityField<T, any>[];
    autopermissions?: boolean;
    constructor(config: IEntityConfig<T>);
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
    getListView: (config?: IEntityListConfig<T> | import("ts-thunk").ThunkFunction<IEntityListConfig<T>, undefined> | undefined) => React.ReactNode;
    getDetailView: (resourceID: React.ReactText, config?: IEntityDetailConfig | undefined) => React.ReactNode;
    getDetailButton: (id: React.ReactText, props: DetailEntityProps) => React.ReactNode;
    getCreateView: (props?: Pick<IEntityCreateProps, "form" | "wrapperType" | "fields" | "initialValues" | "formRef" | "onSave" | "onValuesChanged"> | undefined) => React.ReactNode;
    getCreateButton: (props: Pick<CreateEntityProps, "button" | "form" | "fields" | "initialValues" | "formRef" | "onSave" | "onValuesChanged" | "flow" | "key">) => React.ReactNode;
    getEditView: (props: Pick<IEntityEditProps, "form" | "resourceID" | "wrapperType" | "fields" | "initialValues" | "formRef" | "onSave" | "onValuesChanged">) => React.ReactNode;
    getEditButton: (resourceID: React.ReactText) => React.ReactNode;
    getSearchResourceCollectionConfig: () => ResourceCollectionConfig<T>;
    getSelect(config?: EntitySelectConfig): React.ReactNode;
    stringField(name: string, config?: IEntityFieldConfig<T>): this;
    textField(name: string, config?: IEntityFieldConfig<T>): this;
    numberField(name: string, config?: IEntityFieldNumberConfig<T>): this;
    passwordField(name: string, config?: IEntityFieldConfig<T>): this;
    dateField(name: string, config?: IEntityFieldDateConfig<T>): this;
    booleanField(name: string, config?: IEntityFieldBooleanConfig<T>): this;
    relationshipField(name: string, config: IEntityFieldRelationshipConfig<T>): this;
    fileField(name: string, config?: IEntityFieldFileConfig<T>): this;
    colorField(name: string, config?: IEntityFieldConfig<T>): this;
    enumField(name: string, config: IEntityFieldEnumConfig<T>): this;
    computedField(name: string, config?: IEntityFieldComputedConfig<T>): this;
    customField(name: string, config: IEntityFieldCustomConfig<T>): this;
    getListLink(): string;
    getCreateLink(): string;
    getDetailLink(id: ResourceID): string;
    getEditLink(id: ResourceID): string;
}
export {};
