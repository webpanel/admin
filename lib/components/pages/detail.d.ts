import * as React from 'react';
import { Entity } from '../../model/Entity';
export interface IEntityDetailConfig {
    pollInterval?: number;
}
export interface IEntityDetailProps extends IEntityDetailConfig {
    entity: Entity<any>;
    resourceID: string | number;
    wrapperType?: 'card' | 'plain';
}
export declare class EntityDetail extends React.Component<IEntityDetailProps> {
    render(): React.ReactNode;
}
