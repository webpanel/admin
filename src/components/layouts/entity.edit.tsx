import * as React from 'react';
import {
  EntityEdit,
  IEntityEditConfig,
  EntityOnSaveHandler
} from '../pages/edit';
import { Entity } from '../../model/Entity';

export interface IEntityEditLayoutProps extends IEntityEditConfig {
  resourceID?: string;
  entity: Entity<any>;
  onCreate?: (id: string) => void;
  onSave?: EntityOnSaveHandler;
}

export class EntityEditLayout extends React.Component<IEntityEditLayoutProps> {
  public render() {
    const {
      resourceID,
      form,
      entity,
      initialValues,
      onCreate,
      onSave
    } = this.props;
    return (
      <EntityEdit
        entity={entity}
        resourceID={resourceID}
        form={form}
        onCreate={onCreate}
        onSave={onSave}
        initialValues={initialValues}
      />
    );
  }
}
