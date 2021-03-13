/// <reference types="react" />
import { Entity } from "../../model/Entity";
import { IEntityFormProps } from "../form/entity-form";
import { ModalProps } from "antd/lib/modal";
export interface CreateEntityModalProps extends IEntityFormProps {
    entity: Entity;
    modal?: ModalProps;
}
export declare const CreateEntityModal: (props: CreateEntityModalProps) => JSX.Element;
