import * as React from 'react';
import { DataSource } from 'webpanel-data';
import { IEntityDetailProps } from '../components/pages/detail';
import { EntityField, IEntityFieldConfig } from './EntityField';
import { IEntityEditLayoutProps } from '../components/layouts/entity.edit';
import { IEntityFieldDateConfig } from './fields/EntityFieldDate';
import { IEntityFieldBooleanConfig } from './fields/EntityFieldBoolean';
import { IEntityFieldRelationshipConfig } from './fields/EntityFieldRelationship';
import { IEntityFieldEnumConfig } from './fields/EntityFieldEnum';
import { Thunk } from 'ts-thunk';
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
    render?: ((value: T | null) => string);
}
export declare class Entity<T> {
    private readonly config;
    fields: EntityField<T, any>[];
    constructor(config: IEntityConfig<T>);
    readonly structureName: string;
    readonly title: string;
    readonly enabled: boolean;
    readonly name: string;
    readonly dataSource: DataSource;
    readonly render: ((value: T | null) => string);
    readonly listFields: EntityField<T, any>[];
    readonly editFields: EntityField<T, any>[];
    readonly detailFields: EntityField<T, any>[];
    readonly searchableFields: EntityField<T, any>[];
    readonly detailLayout: ((props: IEntityDetailProps) => React.ReactElement<IEntityDetailProps>) | undefined;
    readonly editLayout: ((props: IEntityEditLayoutProps) => React.ReactElement<IEntityEditLayoutProps>) | undefined;
    readonly createLayout: ((props: IEntityEditLayoutProps) => React.ReactElement<IEntityEditLayoutProps>) | undefined;
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
