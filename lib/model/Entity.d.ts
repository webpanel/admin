import * as React from 'react';
import { DataSource } from 'webpanel-data';
import { IEntityFieldConfig, EntityField } from './EntityField';
interface IEntityConfig {
    name: string;
    dataSource: DataSource;
    title?: string;
}
export declare class Entity<T> {
    private readonly config;
    fields: EntityField<T>[];
    constructor(config: IEntityConfig);
    readonly structureName: string;
    readonly title: string;
    readonly name: string;
    field(config: IEntityFieldConfig<T>): Entity<T>;
    readonly listFields: EntityField<T>[];
    readonly detailFields: EntityField<T>[];
    menuItem: () => React.ReactNode;
    structureItem: () => React.ReactNode;
}
export {};
