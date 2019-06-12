import * as React from 'react';

import { Entity } from '../../model/Entity';
import { fieldPermission } from '../../model/permissions';

export interface LayoutBuilderValueProps {
  name: string;
}

export interface LayoutBuilderValueInternalProps {
  entity: Entity<any>;
  data: any;
}

export class LayoutBuilderValue extends React.Component<
  LayoutBuilderValueProps & LayoutBuilderValueInternalProps
> {
  render(): React.ReactNode {
    const { entity, name, data } = this.props;
    const field = entity.getField(name);

    if (field === null) {
      return `unknown field ${name}`;
    }

    if (!fieldPermission(field, 'read')) {
      return null;
    }

    return field.render(data);
  }
}
