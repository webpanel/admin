/// <reference types="react" />
import { IEntityFormConfig, IEntityFormCreateProps, IEntityFormEditProps } from "../form/entity-form";
export interface IEntityEditConfig extends IEntityFormConfig {
    wrapperType?: "card" | "plain";
}
export interface IEntityEditProps extends IEntityEditConfig, IEntityFormEditProps {
}
export interface IEntityCreateProps extends IEntityEditConfig, IEntityFormCreateProps {
}
export declare const EntityEdit: (props: (IEntityEditProps & IEntityEditConfig) | (IEntityCreateProps & IEntityEditConfig)) => JSX.Element;
