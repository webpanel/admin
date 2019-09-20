import * as React from 'react';

import { Entity } from '../../model/Entity';

export interface LayoutBuilderValueProps {
  name: string;
}

export interface LayoutBuilderValueInternalProps {
  entity: Entity;
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

    if (!field.readable) {
      return null;
    }

    return field.render(data);
  }
}
