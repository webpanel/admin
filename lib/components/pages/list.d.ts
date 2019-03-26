import * as React from 'react';
import { ResourceTablePropsActionButton } from 'webpanel-antd/lib/table/ResourceTableActionButtons';
import { DataSource, ResourceCollection, SortInfo } from 'webpanel-data';
import { Thunk } from 'ts-thunk';
import { DataSourceArgumentMap } from 'webpanel-data/lib/DataSource';
import { Entity } from '../../model/Entity';
import { EntityField } from '../../model/EntityField';
import { PaginationConfig } from 'antd/lib/table';
import { ResourceTableColumn } from 'webpanel-antd/lib/table/ResourceTable';
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
    title?: string;
    fields?: Thunk<IEntityListColumn[]>;
    editableFields?: Thunk<string[]>;
    initialSorting?: SortInfo[];
    initialFilters?: DataSourceArgumentMap;
}
export interface IEntityListProps extends IEntityListConfig {
    entity: Entity<any>;
    dataSource: DataSource;
}
export declare class EntityList extends React.Component<IEntityListProps> {
    getColumns(listFields: {
        field: EntityField<any, any>;
        render?: IEntityListColumnRender;
    }[], resource: ResourceCollection): ResourceTableColumn[];
    render(): JSX.Element;
}
