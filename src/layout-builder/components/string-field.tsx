import * as React from "react";

import { Entity } from "../../model/Entity";
import { Form } from "antd";
import { useTranslation } from "react-i18next";

export interface LayoutBuilderStringFieldProps {
  name: string;
  layout?: "horizontal" | "vertical";
}

export interface LayoutBuilderStringFieldInternalProps {
  entity: Entity;
  data: any;
}

export const LayoutBuilderStringField = (
  props: LayoutBuilderStringFieldProps & LayoutBuilderStringFieldInternalProps
) => {
  const { t } = useTranslation();
  const layouts = {
    horizontal: {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    },
    vertical: {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    },
  };

  const { entity, name, data, layout, ...restProps } = props;
  const field = entity.getField(name);

  if (field === null) {
    return <>unknown field {name}</>;
  }

  if (!field.readable) {
    return null;
  }

  const label = t(field.titleTranslationKey, { defaultValue: field.title });
  return (
    <Form.Item
      {...restProps}
      label={label}
      colon={label ? true : false}
      {...layouts[layout || "horizontal"]}
    >
      {field.render(data)}
    </Form.Item>
  );
};
