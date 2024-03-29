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

export const LayoutBuilderEditField = (
  props: LayoutBuilderEditFieldProps & LayoutBuilderEditFieldInternalProps
): React.ReactNode => {
  const { name, entity, formLayout, values, formInstance } = props;
  const field = entity.getField(name);

  if (field === null) {
    return `unknown field ${name}`;
  }
  if (!field.isWriteable(values)) {
    return null;
  }
  return field.fieldElement(name, { formLayout, formInstance }, values);
};
