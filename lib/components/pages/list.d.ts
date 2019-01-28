import * as React from 'react';
import { DataSource, ResourceCollection, SortInfo } from 'webpanel-data';
import { Entity } from '../../model/Entity';
import { ResourceTableColumn } from 'webpanel-antd/lib/table/ResourceTable';
import { EntityField } from '../../model/EntityField';
import { Thunk } from 'ts-thunk';
import { DataSourceArgumentMap } from 'webpanel-data/lib/DataSource';
export interface IEntityListTableProps {
    condensed?: boolean;
}
export interface IEntityListConfig {
    table?: IEntityListTableProps;
    title?: string;
    fields?: Thunk<string[]>;
    editableFields?: Thunk<string[]>;
    initialSorting?: SortInfo[];
    initialFilters?: DataSourceArgumentMap;
}
export interface IEntityListProps extends IEntityListConfig {
    entity: Entity<any>;
    dataSource: DataSource;
}
export declare class EntityList extends React.Component<IEntityListProps> {
    getColumns(listFields: EntityField<any, any>[], resource: ResourceCollection): ResourceTableColumn[];
    render(): JSX.Element;
}
