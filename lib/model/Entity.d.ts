import * as React from 'react';
import { DataSource } from 'webpanel-data';
interface IEntityFieldConfig {
    name: string;
    title?: string;
    visibility?: {
        list?: boolean;
        detail?: boolean;
    };
}
interface IEntityConfig {
    name: string;
    dataSource: DataSource;
    title?: string;
    fields: IEntityFieldConfig[];
}
export declare class Entity {
    private readonly config;
    constructor(config: IEntityConfig);
    readonly structureName: string;
    readonly title: string;
    readonly name: string;
    readonly listFields: IEntityFieldConfig[];
    readonly detailFields: IEntityFieldConfig[];
    menuItem: () => React.ReactNode;
    structureItem: () => React.ReactNode;
}
export {};
