import '../../../styles/form-detail.css';
import * as React from 'react';
import { ModalProps } from 'antd/lib/modal';
import { ResourceID } from 'webpanel-data';
import { Thunk } from 'ts-thunk';
import { Entity } from '../../model/Entity';
export interface IEntityDetailConfig {
    fields?: Thunk<string[]>;
    pollInterval?: number;
    wrapperType?: 'card' | 'plain' | 'modal';
    modal?: ModalProps;
}
export interface IEntityDetailProps extends IEntityDetailConfig {
    entity: Entity;
    resourceID: ResourceID;
}
export declare class EntityDetail extends React.Component<IEntityDetailProps> {
    render(): React.ReactNode;
}
