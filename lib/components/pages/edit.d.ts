import * as React from 'react';
import { RouteComponentProps } from 'webpanel-antd';
import { Entity } from '../../model/Entity';
export interface IEntityEditProps {
    entity: Entity<any>;
    route: RouteComponentProps<any>;
    pushDetailOnCreate?: boolean;
}
export declare class EntityEdit extends React.Component<IEntityEditProps> {
    render(): JSX.Element;
}
