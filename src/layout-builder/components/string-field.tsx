import * as React from 'react';
import { Form } from 'antd';
import { Entity } from '../../model/Entity';
import { fieldPermission } from '../../model/permissions';

export interface LayoutBuilderStringFieldProps {
  name: string;
  layout?: 'horizontal' | 'vertical';
}

export interface LayoutBuilderStringFieldInternalProps {
  entity: Entity<any>;
  data: any;
}

export class LayoutBuilderStringField extends React.Component<
  LayoutBuilderStringFieldProps & LayoutBuilderStringFieldInternalProps
> {
  private layouts = {
    horizontal: {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    },
    vertical: {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
  };

  render() {
    const { entity, name, data, layout, ...props } = this.props;
    const field = entity.getField(name);

    if (field === null) {
      return `unknown field ${name}`;
    }

    if (!fieldPermission(field, 'read')) {
      return null;
    }

    return (
      <Form.Item
        {...props}
        //   key={key}
        label={field.title}
        colon={field.title ? true : false}
        //   className={`${item.value === null ? '' : 'rounded'} job-info__item`}
        {...this.layouts[layout || 'horizontal']}
      >
        {field.render(data)}
      </Form.Item>
    );
  }
}
