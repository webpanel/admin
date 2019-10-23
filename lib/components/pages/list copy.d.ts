import * as React from 'react';
import { DataSource, ResourceCollection, SortInfo } from 'webpanel-data';
import { PaginationConfig, TableProps } from 'antd/lib/table';
import { Thunk } from 'ts-thunk';
import { ActionButtonProps } from 'webpanel-antd/lib/table/ResourceTableActionButtons';
import { CreateEntityProps } from '../buttons/EntityAddButton';
import { DataSourceArgumentMap } from 'webpanel-data/lib/DataSource';
import { Entity } from '../../model/Entity';
import { EntityField } from '../../model/EntityField';
import { ResourceTableColumn } from 'webpanel-antd/lib/table/ResourceTable';
import i18next from 'i18next';
interface EntityListActionButtonProps extends ActionButtonProps {
    entity: Entity<any>;
}
declare type EntitylistActionButton = 'detail' | 'edit' | 'delete' | React.ReactNode | ((props: EntityListActionButtonProps) => React.ReactNode);
export interface IEntityListTableProps extends TableProps<any> {
    condensed?: boolean;
    actionButtons?: EntitylistActionButton[];
    actionButtonsTitle?: React.ReactNode;
    actionButtonsFixed?: boolean;
    pagination?: PaginationConfig | false;
}
export declare type IEntityListColumnRender = (value: any, values: any, index: number, field: EntityField<any, any>) => React.ReactNode | {
    childre: React.ReactNode;
    props: {
        rowSpan: number;
        colSpan: number;
    };
};
export declare type IEntityListColumn = string | {
    field: string;
    hidden?: boolean;
    render?: IEntityListColumnRender;
};
export interface IEntityListConfig {
    table?: IEntityListTableProps;
    card?: {
        extra?: React.ReactNode;
    };
    searchable?: boolean;
    showAddButton?: boolean;
    addButton?: boolean | CreateEntityProps;
    title?: string;
    fields?: Thunk<IEntityListColumn[]>;
    editableFields?: Thunk<string[]>;
    initialSorting?: SortInfo[];
    initialFilters?: DataSourceArgumentMap;
    initialLimit?: number;
    autopersistConfigKey?: string;
    pollInterval?: number;
    wrapperType?: 'card' | 'plain';
}
export interface IEntityListProps extends IEntityListConfig {
    entity: Entity;
    dataSource: DataSource;
}
export declare class EntityList extends React.Component<IEntityListProps> {
    getColumns(listFields: {
        field: EntityField<any, any>;
        render?: IEntityListColumnRender;
    }[], resource: ResourceCollection, t: i18next.TFunction): ResourceTableColumn[];
    private getListFields;
    private cardContent;
    private tableContent;
    render(): React.ReactNode;
}
export {};
