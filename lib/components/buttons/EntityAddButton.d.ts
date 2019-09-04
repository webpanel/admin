import * as React from 'react';
import { Entity } from '../../model/Entity';
import { ModalProps } from 'antd/lib/modal';
export interface IEntityAddButtonProps {
    flow: 'modal' | 'redirect';
    initialValues?: {
        [key: string]: any;
    };
    modal?: ModalProps;
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
    render(): JSX.Element;
    private hideModal;
}
export {};
