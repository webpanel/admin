import * as React from 'react';
import { RouteComponentProps } from 'webpanel-antd';
import { Entity } from '../../model/Entity';
export declare class EntityEdit extends React.Component<{
    entity: Entity<any>;
    route: RouteComponentProps<any>;
    detailOnCreate?: boolean;
}> {
    render(): JSX.Element;
}
