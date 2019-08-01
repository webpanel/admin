import * as React from 'react';
import { ResourceTablePropsActionButton } from 'webpanel-antd/lib/table/ResourceTableActionButtons';
import { DataSource, ResourceCollection, SortInfo } from 'webpanel-data';
import { IEntityAddButtonProps } from '../buttons/EntityAddButton';
import { Thunk } from 'ts-thunk';
import { DataSourceArgumentMap } from 'webpanel-data/lib/DataSource';
import { Entity } from '../../model/Entity';
import { EntityField } from '../../model/EntityField';
import { PaginationConfig } from 'antd/lib/table';
import { ResourceTableColumn } from 'webpanel-antd/lib/table/ResourceTable';
import i18next from 'i18next';
export interface IEntityListTableProps {
    condensed?: boolean;
    actionButtons?: ResourceTablePropsActionButton[];
    actionButtonsTitle?: React.ReactNode;
    actionButtonsFixed?: boolean;
    pagination?: PaginationConfig | false;
}
export declare type IEntityListColumnRender = (value: any, values: any, field: EntityField<any, any>) => React.ReactNode;
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
    addButton?: boolean | IEntityAddButtonProps;
    title?: string;
    fields?: Thunk<IEntityListColumn[]>;
    editableFields?: Thunk<string[]>;
    initialSorting?: SortInfo[];
    initialFilters?: DataSourceArgumentMap;
    initialLimit?: number;
    autopersistConfigKey?: string;
    pollInterval?: number;
    displayMode?: 'card' | 'plain';
}
export interface IEntityListProps extends IEntityListConfig {
    entity: Entity<any>;
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
