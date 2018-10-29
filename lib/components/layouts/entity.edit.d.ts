import * as React from 'react';
import { Entity } from '../../model/Entity';
import { RouteComponentProps } from 'react-router';
export interface IEntityEditLayoutProps {
    entity: Entity<any>;
    route: RouteComponentProps<any>;
    onCreate?: (id: string) => void;
}
export declare class EntityEditLayout extends React.Component<IEntityEditLayoutProps> {
    render(): JSX.Element;
}
