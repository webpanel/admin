import * as React from 'react';
import { DataSource } from 'webpanel-data';
import { Entity } from '../../model/Entity';
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
    render(): JSX.Element;
}
