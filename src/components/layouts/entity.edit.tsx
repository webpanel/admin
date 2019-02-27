import * as React from 'react';
import { EntityEdit, IEntityEditConfig } from '../pages/edit';
import { Entity } from '../../model/Entity';
import { RouteComponentProps } from 'react-router';

export interface IEntityEditLayoutProps extends IEntityEditConfig {
  entity: Entity<any>;
  route: RouteComponentProps<any>;
  onCreate?: (id: string) => void;
}

export class EntityEditLayout extends React.Component<IEntityEditLayoutProps> {
  public render() {
    const { route, form, initialValues } = this.props;
    return (
      <EntityEdit
        entity={this.props.entity}
        resourceID={route.match.params.id}
        route={route}
        form={form}
        initialValues={initialValues}
      />
    );
  }
}
