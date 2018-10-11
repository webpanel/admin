import * as React from 'react';
import { RouteComponentProps } from 'webpanel-antd';
import { Entity } from '../../model/Entity';
export interface IEntityDetailProps {
    entity: Entity<any>;
    route: RouteComponentProps<any>;
}
export declare class EntityDetail extends React.Component<IEntityDetailProps> {
    render(): JSX.Element;
}
