import * as React from 'react';

import {
  EntityEdit,
  EntityOnSaveHandler,
  IEntityEditConfig
} from '../pages/edit';

import { Entity } from '../../model/Entity';

export interface IEntityEditLayoutProps extends IEntityEditConfig {
  resourceID?: string | number;
  entity: Entity<any>;
  onCreate?: (id: string) => void;
  onSave?: EntityOnSaveHandler;
  onCancel?: () => void;
}

export class EntityEditLayout extends React.Component<IEntityEditLayoutProps> {
  public render(): React.ReactNode {
    return <EntityEdit {...this.props} />;
  }
}
