import '../../../styles/form-detail.css';
import * as React from 'react';
import { Entity } from '../../model/Entity';
export interface IEntityDetailConfig {
    pollInterval?: number;
    wrapperType?: 'card' | 'plain';
}
export interface IEntityDetailProps extends IEntityDetailConfig {
    entity: Entity;
    resourceID: string | number;
}
export declare class EntityDetail extends React.Component<IEntityDetailProps> {
    render(): React.ReactNode;
}
