import * as React from 'react';

import { EntityDetail, IEntityDetailProps } from '../pages/detail';

export class EntityDetailLayout extends React.Component<IEntityDetailProps> {
  public render() {
    return <EntityDetail {...this.props} />;
  }
}
