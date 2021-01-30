import * as React from "react";

import { FormInstance, FormLayout } from "antd/lib/form/Form";

import { Entity } from "../../model/Entity";

export interface LayoutBuilderEditFieldProps {
  name: string;
  formLayout?: FormLayout;
  formInstance?: FormInstance;
  values?: any;
}
export interface LayoutBuilderEditFieldInternalProps {
  entity: Entity;
}

export class LayoutBuilderEditField extends React.Component<
  LayoutBuilderEditFieldProps & LayoutBuilderEditFieldInternalProps
> {
  render(): React.ReactNode {
    const { name, entity, formLayout, values, formInstance } = this.props;
    const field = entity.getField(name);

    if (field === null) {
      return `unknown field ${name}`;
    }
    if (!field.writeable) {
      return null;
    }
    return field.fieldElement(name, { formLayout, formInstance }, values);
  }
}
