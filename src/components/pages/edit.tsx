import * as React from "react";

import {
  EntityForm,
  IEntityFormConfig,
  IEntityFormCreateProps,
  IEntityFormEditProps,
} from "../form/entity-form";

import { Card } from "antd";
import { FormInstance } from "webpanel-antd";

export interface IEntityEditConfig extends IEntityFormConfig {
  wrapperType?: "card" | "plain";
}

export interface IEntityEditProps
  extends IEntityEditConfig,
    IEntityFormEditProps {}
export interface IEntityCreateProps
  extends IEntityEditConfig,
    IEntityFormCreateProps {}

export const EntityEdit = (
  props: (IEntityEditProps | IEntityCreateProps) & IEntityEditConfig
) => {
  const { entity, wrapperType, formRef, ...restProps } = props;
  let formRefLocal = formRef;
  if (typeof formRefLocal === "undefined") {
    formRefLocal = React.useRef<FormInstance | null>(null);
  }

  switch (wrapperType) {
    case "plain":
      return (
        <EntityForm entity={entity} {...restProps} formRef={formRefLocal} />
      );
    default:
      return (
        <Card>
          <EntityForm
            entity={entity}
            {...restProps}
            formRef={formRefLocal}
            showButtons={true}
          />
        </Card>
      );
  }
};
