import * as React from 'react';
import { IEntityDetailProps, EntityDetail } from '../pages/detail';

export class EntityDetailLayout extends React.Component<IEntityDetailProps> {
  public render() {
    return <EntityDetail entity={this.props.entity} route={this.props.route} />;
  }
}
