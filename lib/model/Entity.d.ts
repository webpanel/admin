import * as React from 'react';
import { DataSource, SortInfo } from 'webpanel-data';
import { IEntityListTableProps } from '../components/pages/list';
import { IEntityDetailProps } from '../components/pages/detail';
import { EntityField, IEntityFieldConfig, FieldPermission } from './EntityField';
import { IEntityEditLayoutProps } from '../components/layouts/entity.edit';
import { IEntityFieldDateConfig } from './fields/EntityFieldDate';
import { IEntityFieldBooleanConfig } from './fields/EntityFieldBoolean';
import { IEntityFieldRelationshipConfig } from './fields/EntityFieldRelationship';
import { IEntityFieldEnumConfig } from './fields/EntityFieldEnum';
import { Thunk } from 'ts-thunk';
import { IEntityEditFormProps } from '../components/pages/edit';
import { DataSourceArgumentMap } from 'webpanel-data/lib/DataSource';
import { LayoutBuilder } from '../layout-builder';
import { LayoutBuilderConfig } from '../layout-builder/builder';
export interface IEntityConfig<T> {
    name: Thunk<string>;
    icon?: Thunk<string>;
    dataSource: Thunk<DataSource>;
    title?: Thunk<string>;
    enabled?: Thunk<boolean>;
    showDetailPage?: Thunk<boolean>;
    layouts?: {
        detail?: (props: IEntityDetailProps) => React.ReactElement<IEntityDetailProps>;
        edit?: (props: IEntityEditLayoutProps) => React.ReactElement<IEntityEditLayoutProps>;
        create?: (props: IEntityEditLayoutProps) => React.ReactElement<IEntityEditLayoutProps>;
    };
    list?: {
        table?: IEntityListTableProps;
    };
    edit?: {
        form?: IEntityEditFormProps;
    };
    searchable?: boolean;
    initialSorting?: SortInfo[];
    initialFilters?: DataSourceArgumentMap;
    render?: ((value: T | null) => string);
}
export declare class Entity<T> {
    private readonly config;
    fields: EntityField<T, any>[];
    constructor(config: IEntityConfig<T>);
    readonly structureName: string;
    readonly title: string;
    readonly enabled: boolean;
    readonly showDetailPage: boolean;
    readonly name: string;
    readonly dataSource: DataSource;
    readonly render: ((value: T | null) => string);
    readonly initialSorting: SortInfo[] | undefined;
    readonly initialFilters: DataSourceArgumentMap | undefined;
    readonly searchable: boolean;
    getField(name: string): EntityField<T, any> | null;
    readonly listFields: EntityField<T, any>[];
    readonly editFields: EntityField<T, any>[];
    editFieldsWithPermission(permission: FieldPermission): EntityField<T, any>[];
    readonly detailFields: EntityField<T, any>[];
    readonly searchableFields: EntityField<T, any>[];
    readonly detailLayout: ((props: IEntityDetailProps) => React.ReactElement<IEntityDetailProps>) | undefined;
    readonly editLayout: ((props: IEntityEditLayoutProps) => React.ReactElement<IEntityEditLayoutProps>) | undefined;
    readonly createLayout: ((props: IEntityEditLayoutProps) => React.ReactElement<IEntityEditLayoutProps>) | undefined;
    private layouts;
    setLayout: (type: "detail" | "edit", fn: (builder: LayoutBuilder) => React.ReactNode) => void;
    getLayout(type: 'detail' | 'edit', config: LayoutBuilderConfig): React.ReactNode | null;
    menuItem: () => React.ReactNode;
    structureItem: () => React.ReactNode;
    private getDetailPageLayout;
    private getEditPageLayout;
    private getCreatePageLayout;
    inputField(name: string, config?: IEntityFieldConfig<T>): Entity<T>;
    stringField(name: string, config?: IEntityFieldConfig<T>): Entity<T>;
    textField(name: string, config?: IEntityFieldConfig<T>): Entity<T>;
    numberField(name: string, config?: IEntityFieldConfig<T>): Entity<T>;
    dateField(name: string, config?: IEntityFieldDateConfig<T>): Entity<T>;
    booleanField(name: string, config?: IEntityFieldBooleanConfig<T>): Entity<T>;
    relationshipField(name: string, config: IEntityFieldRelationshipConfig<T>): Entity<T>;
    colorField(name: string, config?: IEntityFieldConfig<T>): Entity<T>;
    enumField(name: string, config: IEntityFieldEnumConfig<T>): Entity<T>;
}
