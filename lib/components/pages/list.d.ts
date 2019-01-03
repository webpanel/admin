import * as React from 'react';
import { DataSource, ResourceCollection } from 'webpanel-data';
import { Entity } from '../../model/Entity';
import { ResourceTableColumn } from 'webpanel-antd/lib/table/ResourceTable';
import { EntityField } from '../../model/EntityField';
import { Thunk } from 'ts-thunk';
export interface IEntityListTableProps {
    condensed?: boolean;
}
export interface IEntityListConfig {
    table?: IEntityListTableProps;
    fields?: Thunk<string[]>;
    editableFields?: Thunk<string[]>;
}
export interface IEntityListProps extends IEntityListConfig {
    entity: Entity<any>;
    dataSource: DataSource;
}
export declare class EntityList extends React.Component<IEntityListProps> {
    getColumns(listFields: EntityField<any, any>[], resource: ResourceCollection): ResourceTableColumn[];
    render(): JSX.Element;
}
