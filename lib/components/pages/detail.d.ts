import '../../../styles/form-detail.css';
import * as React from 'react';
import { ResourceID } from 'webpanel-data';
import { Entity } from '../../model/Entity';
import { Thunk } from 'ts-thunk';
export interface IEntityDetailConfig {
    fields?: Thunk<string[]>;
    pollInterval?: number;
    wrapperType?: 'card' | 'plain';
}
export interface IEntityDetailProps extends IEntityDetailConfig {
    entity: Entity;
    resourceID: ResourceID;
}
export declare class EntityDetail extends React.Component<IEntityDetailProps> {
    render(): React.ReactNode;
}
