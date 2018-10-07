import * as React from 'react';
import { DataSource } from 'webpanel-data';
import { Entity } from '../model/Entity';
export declare class EntityList extends React.Component<{
    entity: Entity;
    dataSource: DataSource;
}> {
    render(): JSX.Element;
}
