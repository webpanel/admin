import * as React from "react";
import { ButtonProps } from "antd/lib/button";
import { Entity } from "../../model/Entity";
import { IEntityFormConfig } from "../form/entity-form";
import { ModalProps } from "antd/lib/modal";
import { ResourceID } from "webpanel-data";
export interface IEntityAddButtonModalFlow {
    type: "modal";
    modal?: ModalProps;
}
declare type FlowType = "redirect" | IEntityAddButtonModalFlow;
export interface CreateEntityProps extends IEntityFormConfig {
    onCreate?: (id: ResourceID) => void;
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
