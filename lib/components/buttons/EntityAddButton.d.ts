import * as React from 'react';
import { ButtonProps } from 'antd/lib/button';
import { Entity } from '../../model/Entity';
import { IEntityEditConfig } from '../pages/edit';
import { ModalProps } from 'antd/lib/modal';
export interface IEntityAddButtonModalFlow {
    type: 'modal';
    modal?: ModalProps;
}
declare type FlowType = 'redirect' | IEntityAddButtonModalFlow;
export interface CreateEntityProps extends IEntityEditConfig {
    modalTitle?: string;
    onCreate?: (id: string | number) => void;
    flow?: FlowType;
    key?: string;
    button?: ButtonProps;
}
export interface CreateEntityButtonProps extends CreateEntityProps {
    entity: Entity;
}
export declare class CreateEntityButton extends React.Component<CreateEntityButtonProps, {
    showModal: boolean;
}> {
    state: {
        showModal: boolean;
    };
    render(): JSX.Element | "unexpected flow";
    private hideModal;
}
export {};
