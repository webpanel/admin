import * as React from 'react';
import { DataSource } from 'webpanel-data';
import { IEntityFieldConfig, EntityField } from './EntityField';
interface IEntityConfig<T> {
    name: string;
    icon?: string;
    dataSource: DataSource;
    title?: string;
    showDetailPage?: boolean;
    render?: ((value: T) => string);
}
export declare class Entity<T> {
    private readonly config;
    fields: EntityField<T>[];
    constructor(config: IEntityConfig<T>);
    readonly structureName: string;
    readonly title: string;
    readonly name: string;
    readonly dataSource: DataSource;
    readonly render: ((value: T) => string);
    field(config: string | IEntityFieldConfig<T>): Entity<T>;
    readonly listFields: EntityField<T>[];
    readonly editFields: EntityField<T>[];
    readonly detailFields: EntityField<T>[];
    readonly searchableFields: EntityField<T>[];
    menuItem: () => React.ReactNode;
    structureItem: () => React.ReactNode;
}
export {};
