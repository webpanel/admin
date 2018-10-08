import * as React from 'react';
import { RouteComponentProps } from 'webpanel-antd';
import { DataSource } from 'webpanel-data';
import { Entity } from '../../model/Entity';
export declare class EntityDetail extends React.Component<{
    entity: Entity<any>;
    route: RouteComponentProps<any>;
    dataSource: DataSource;
}> {
    render(): JSX.Element;
}
