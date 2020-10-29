/// <reference types="react" />
import { IEntityFormConfig, IEntityFormProps } from "../form/entity-form";
import { ModalProps } from "antd/lib/modal";
export interface IEntityEditConfig extends IEntityFormConfig {
    wrapperType?: "card" | "plain" | "modal";
    modal?: ModalProps;
}
export interface IEntityEditProps extends IEntityEditConfig, IEntityFormProps {
}
export declare const EntityEdit: (props: IEntityEditProps) => JSX.Element;
