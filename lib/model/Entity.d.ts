import * as React from 'react';
import { DataSource } from 'webpanel-data';
import { IEntityFieldConfig, EntityField } from './EntityField';
interface IEntityConfig {
    name: string;
    dataSource: DataSource;
    title?: string;
}
export declare class Entity {
    private readonly config;
    fields: EntityField[];
    constructor(config: IEntityConfig);
    readonly structureName: string;
    readonly title: string;
    readonly name: string;
    field(config: IEntityFieldConfig): Entity;
    readonly listFields: EntityField[];
    readonly detailFields: EntityField[];
    menuItem: () => React.ReactNode;
    structureItem: () => React.ReactNode;
}
export {};
