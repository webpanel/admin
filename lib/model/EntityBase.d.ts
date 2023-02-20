import * as React from "react";
import { DataSource, ResourceID, SortInfo } from "webpanel-data";
import { IEntityDetailConfig, IEntityDetailProps } from "../components/pages/detail";
import { IEntityCreateProps, IEntityEditConfig, IEntityEditProps } from "../components/pages/edit";
import { IEntityListConfig } from "../components/pages/list";
import { Thunk } from "ts-thunk";
import { DataSourceArgumentMap } from "webpanel-data/lib/DataSource";
import { LayoutBuilder } from "../layout-builder";
import { LayoutBuilderConfig } from "../layout-builder/builder";
import { MenuItemProps } from "antd/lib/menu/MenuItem";
import { StructureItemProps } from "webpanel-antd/lib/layout/Structure";
export type EntityDataType = {
    id: ResourceID;
};
interface IEntitySearchableConfig {
    fields: Thunk<string[]>;
}
interface IEntityDetailOptions<T extends EntityDataType> {
    entity: EntityBase<T>;
    resourceID: ResourceID;
}
interface IEntityEditOptions<T extends EntityDataType> {
    entity: EntityBase<T>;
    resourceID?: ResourceID;
}
type ILayoutGetter<T> = (props: T) => React.ReactNode;
export interface IEntityConfig<T extends EntityDataType> {
    name: Thunk<string>;
    resourceName?: Thunk<string>;
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
export declare class EntityBase<T extends EntityDataType = EntityDataType> {
    protected config: IEntityConfig<T>;
    autopermissions?: boolean;
    constructor(config: IEntityConfig<T>);
    updateConfig(config: Partial<IEntityConfig<T>>): this;
    protected clone(): this;
    get structureName(): string;
    get title(): string;
    get enabled(): boolean;
    get creatable(): boolean;
    updateable(values: T): boolean;
    deletable(values: T): boolean;
    get showDetailPage(): boolean;
    get name(): string;
    get resourceName(): string;
    get dataSource(): DataSource;
    getListConfig(): IEntityListConfig<T> | undefined;
    getEditConfig(resourceID?: ResourceID): IEntityEditConfig | undefined;
    getDetailConfig(resourceID: ResourceID): IEntityDetailConfig | undefined;
    get initialSorting(): SortInfo[] | undefined;
    get initialFilters(): DataSourceArgumentMap | undefined;
    get searchable(): boolean;
    get detailLayout(): ILayoutGetter<IEntityDetailProps> | undefined;
    get editLayout(): ILayoutGetter<IEntityEditProps> | undefined;
    get createLayout(): ILayoutGetter<IEntityCreateProps> | undefined;
    setDetailLayout(fn: ILayoutGetter<IEntityDetailProps>): void;
    setEditLayout(fn: ILayoutGetter<IEntityEditProps>): void;
    setCreateLayout(fn: ILayoutGetter<IEntityCreateProps>): void;
    private cardLayouts;
    setCardLayout: (type: "detail" | "edit", fn: (builder: LayoutBuilder) => React.ReactNode) => void;
    getCardLayout(type: "detail" | "edit", config: LayoutBuilderConfig & (IEntityDetailConfig | IEntityEditConfig)): React.ReactNode;
    getListLink(): string;
    getCreateLink(): string;
    getDetailLink(id: ResourceID): string;
    getEditLink(id: ResourceID): string;
}
export {};
