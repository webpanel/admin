import * as React from 'react';
import { Entity } from '../../model/Entity';
import { ModalProps } from 'antd/lib/modal';
export interface IEntityAddButtonModalFlow {
    type: 'modal';
    modal?: ModalProps;
}
declare type FlowType = 'redirect' | IEntityAddButtonModalFlow;
export interface IEntityAddButtonProps {
    initialValues?: {
        [key: string]: any;
    };
    flow?: FlowType;
}
interface IEntityAddButtonComponentProps extends IEntityAddButtonProps {
    entity: Entity;
    onCreate?: () => void;
}
interface IEntityAddButtonState {
    showModal: boolean;
}
export declare class EntityAddButton extends React.Component<IEntityAddButtonComponentProps, IEntityAddButtonState> {
    state: {
        showModal: boolean;
    };
    render(): JSX.Element | "unexpected flow";
    private hideModal;
}
export {};
