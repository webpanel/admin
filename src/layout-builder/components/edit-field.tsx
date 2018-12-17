import * as React from 'react';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { FormLayout } from 'antd/lib/form/Form';
import { Entity } from '../../model/Entity';
import { fieldPermission } from '../../model/permissions';

export interface LayoutBuilderEditFieldProps {
  name: string;
  formLayout?: FormLayout;
}
export interface LayoutBuilderEditFieldInternalProps {
  entity: Entity<any>;
  formContext: FormContext;
}

export class LayoutBuilderEditField extends React.Component<
  LayoutBuilderEditFieldProps & LayoutBuilderEditFieldInternalProps
> {
  render() {
    const { formContext, name, entity, formLayout } = this.props;
    const field = entity.getField(name);

    if (field === null) {
      return `unknown field ${name}`;
    }
    if (!fieldPermission(field, 'write')) {
      return null;
    }
    return field.fieldElement(formContext, name, { formLayout });
  }
}
