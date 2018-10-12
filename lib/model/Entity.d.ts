import * as React from 'react';
import { DataSource } from 'webpanel-data';
import { IEntityEditProps } from '../components/pages/edit';
import { IEntityDetailProps } from '../components/pages/detail';
import { IEntityFieldConfig, EntityField } from './EntityField';
export interface IEntityConfig<T> {
    name: string;
    icon?: string;
    dataSource: DataSource;
    title?: string;
    showDetailPage?: boolean;
    layouts?: {
        detail?: (props: IEntityDetailProps) => React.ReactElement<IEntityDetailProps>;
        edit?: (props: IEntityDetailProps) => React.ReactElement<IEntityEditProps>;
    };
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
    readonly detailLayout: ((props: IEntityDetailProps) => React.ReactElement<IEntityDetailProps>) | undefined;
    readonly editLayout: ((props: IEntityDetailProps) => React.ReactElement<IEntityDetailProps>) | undefined;
    menuItem: () => React.ReactNode;
    structureItem: () => React.ReactNode;
    private getDetailPageLayout;
    private getEditPageLayout;
}
