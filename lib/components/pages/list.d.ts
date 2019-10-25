import * as React from 'react';
import { DataSource, ResourceCollection, ResourceCollectionOptions } from 'webpanel-data';
import { EntitylistActionButton } from './list.buttons';
import { PaginationConfig, TableProps } from 'antd/lib/table';
import { Thunk } from 'ts-thunk';
import { CreateEntityProps } from '../buttons/EntityAddButton';
import { Entity } from '../../model/Entity';
import { EntityField } from '../../model/EntityField';
import { ResourceTableColumn } from 'webpanel-antd/lib/table/ResourceTable';
import i18next from 'i18next';
export interface IEntityListTableProps extends TableProps<any>, ResourceCollectionOptions {
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
export interface IEntityListConfig extends ResourceCollectionOptions {
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
    private tableActionButtons;
    private tableContent;
    render(): React.ReactNode;
}
