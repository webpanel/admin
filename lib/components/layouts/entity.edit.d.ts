import * as React from 'react';
import { EntityOnSaveHandler, IEntityEditConfig } from '../pages/edit';
import { Entity } from '../../model/Entity';
import { ResourceID } from 'webpanel-data';
export interface IEntityEditLayoutProps extends IEntityEditConfig {
    resourceID?: ResourceID;
    entity: Entity;
    onCreate?: (id: string) => void;
    onSave?: EntityOnSaveHandler;
    onCancel?: () => void;
}
export declare class EntityEditLayout extends React.Component<IEntityEditLayoutProps> {
    render(): React.ReactNode;
}
