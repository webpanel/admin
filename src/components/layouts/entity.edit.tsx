import * as React from 'react';
import { EntityEdit } from '../pages/edit';
import { Entity } from '../../model/Entity';
import { RouteComponentProps } from 'react-router';

export interface IEntityEditLayoutProps {
  entity: Entity<any>;
  route: RouteComponentProps<any>;
  onCreate?: (id: string) => void;
}

export class EntityEditLayout extends React.Component<IEntityEditLayoutProps> {
  public render() {
    const { route, onCreate } = this.props;
    return (
      <EntityEdit
        entity={this.props.entity}
        resourceID={route.match.params.id}
        onCreate={onCreate}
      />
    );
  }
}
