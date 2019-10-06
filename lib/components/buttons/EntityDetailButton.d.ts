import * as React from 'react';
import { ButtonProps } from 'antd/lib/button';
import { Entity } from '../../model/Entity';
import { IEntityDetailConfig } from '../pages/detail';
import { ModalProps } from 'antd/lib/modal';
import { ResourceID } from 'webpanel-data';
export interface IEntityDetailButtonModalFlow {
    type: 'modal';
    modal?: ModalProps;
}
declare type FlowType = 'redirect' | IEntityDetailButtonModalFlow;
export interface DetailEntityProps extends IEntityDetailConfig {
    flow?: FlowType;
    key?: string;
    button?: ButtonProps;
}
export interface DetailEntityButtonProps extends DetailEntityProps {
    entity: Entity;
    entityId: ResourceID;
}
export declare class DetailEntityButton extends React.Component<DetailEntityButtonProps, {
    showModal: boolean;
}> {
    state: {
        showModal: boolean;
    };
    render(): JSX.Element | "unexpected flow";
    private showModal;
    private hideModal;
}
export {};
