import * as React from "react";
import { IEntityEditConfig, EntityOnSaveHandler } from "../pages/edit";
import { Entity } from "../../model/Entity";
export interface IEntityEditLayoutProps extends IEntityEditConfig {
    resourceID?: string;
    entity: Entity<any>;
    onCreate?: (id: string) => void;
    onSave?: EntityOnSaveHandler;
    onCancel?: () => void;
}
export declare class EntityEditLayout extends React.Component<IEntityEditLayoutProps> {
    render(): JSX.Element;
}
