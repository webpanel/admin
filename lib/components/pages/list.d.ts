import * as React from 'react';
import { DataSource } from 'webpanel-data';
import { Entity } from '../../model/Entity';
export interface IEntityListProps {
    entity: Entity<any>;
    dataSource: DataSource;
    detailButtonText: string;
}
export declare class EntityList extends React.Component<IEntityListProps> {
    render(): JSX.Element;
}
