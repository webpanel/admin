import * as React from 'react';
import { EntityEdit, IEntityEditProps } from '../pages/edit';

export class EntityEditLayout extends React.Component<IEntityEditProps> {
  public render() {
    return <EntityEdit entity={this.props.entity} route={this.props.route} />;
  }
}
