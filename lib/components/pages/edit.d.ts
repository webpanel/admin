import * as React from 'react';
import { Entity } from '../../model/Entity';
export interface IEntityEditProps {
    entity: Entity<any>;
    resourceID?: string;
    onCreate?: (id: string) => void;
}
export declare class EntityEdit extends React.Component<IEntityEditProps> {
    render(): JSX.Element;
}
