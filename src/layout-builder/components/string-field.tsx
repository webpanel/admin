import * as React from "react";

import { Entity } from "../../model/Entity";
import { Form } from "antd";
import { Translation } from "react-i18next";

export interface LayoutBuilderStringFieldProps {
  name: string;
  layout?: "horizontal" | "vertical";
}

export interface LayoutBuilderStringFieldInternalProps {
  entity: Entity;
  data: any;
}

export class LayoutBuilderStringField extends React.Component<
  LayoutBuilderStringFieldProps & LayoutBuilderStringFieldInternalProps
> {
  private layouts = {
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

  render(): React.ReactNode {
    const { entity, name, data, layout, ...props } = this.props;
    const field = entity.getField(name);

    if (field === null) {
      return `unknown field ${name}`;
    }

    if (!field.readable) {
      return null;
    }

    return (
      <Translation>
        {(t) => (
          <Form.Item
            {...props}
            label={t(field.name, { defaultValue: field.title })}
            colon={field.title ? true : false}
            {...this.layouts[layout || "horizontal"]}
          >
            {field.render(data)}
          </Form.Item>
        )}
      </Translation>
    );
  }
}
