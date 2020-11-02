import * as React from "react";

import { Entity } from "../../model/Entity";
import { FormLayout } from "antd/lib/form/Form";

export interface LayoutBuilderEditFieldProps {
  name: string;
  formLayout?: FormLayout;
}
export interface LayoutBuilderEditFieldInternalProps {
  entity: Entity;
}

export class LayoutBuilderEditField extends React.Component<
  LayoutBuilderEditFieldProps & LayoutBuilderEditFieldInternalProps
> {
  render(): React.ReactNode {
    const { name, entity, formLayout } = this.props;
    const field = entity.getField(name);

    if (field === null) {
      return `unknown field ${name}`;
    }
    if (!field.writeable) {
      return null;
    }
    return field.fieldElement(name, { formLayout });
  }
}
