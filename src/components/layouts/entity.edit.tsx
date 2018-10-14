import * as React from 'react';
import { EntityEdit } from '../pages/edit';
import { Entity } from '../../model/Entity';
import { RouteComponentProps } from 'react-router';

export interface IEntityEditLayoutProps {
  entity: Entity<any>;
  route: RouteComponentProps<any>;
  pushDetailOnCreate?: boolean;
}

export class EntityEditLayout extends React.Component<IEntityEditLayoutProps> {
  public render() {
    const { route, pushDetailOnCreate } = this.props;
    return (
      <EntityEdit
        entity={this.props.entity}
        resourceID={route.match.params.id}
        onCreate={(id: string) => {
          if (pushDetailOnCreate) {
            route.history.push(id);
          }
        }}
      />
    );
  }
}
