/// <reference types="react" />
import { ButtonProps } from "antd/lib/button";
import { Entity } from "../../model/Entity";
import { IEntityFormProps } from "../form/entity-form";
import { ModalProps } from "antd/lib/modal";
export interface IEntityAddButtonModalFlow {
    type: "modal";
    modal?: ModalProps;
}
declare type FlowType = "redirect" | IEntityAddButtonModalFlow;
export interface CreateEntityProps extends IEntityFormProps {
    flow?: FlowType;
    key?: string;
    button?: ButtonProps;
}
export interface CreateEntityButtonProps extends CreateEntityProps {
    entity: Entity;
}
export declare const CreateEntityButton: (props: CreateEntityButtonProps) => JSX.Element;
export {};
