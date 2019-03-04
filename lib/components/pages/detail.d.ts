import * as React from "react";
import { Entity } from "../../model/Entity";
export interface IEntityDetailProps {
    entity: Entity<any>;
    resourceID: string | number;
}
export declare class EntityDetail extends React.Component<IEntityDetailProps> {
    render(): JSX.Element;
}
