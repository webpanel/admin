import * as React from 'react';
import { EntityField, IEntityFieldConfig } from '../EntityField';

import { Checkbox } from 'antd';

export interface IEntityFieldBooleanConfig<T> extends IEntityFieldConfig<T> {}

export class EntityFieldBoolean<T> extends EntityField<
  T,
  IEntityFieldBooleanConfig<T>
> {
  public get valuePropName(): string {
    return 'checked';
  }

  public get render(): ((record: T) => React.ReactNode) {
    return values => (values[this.name] ? '✓' : '✗');
  }
  public inputElement(props?: {
    value?: any;
    onChange?: (value: any) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    return <Checkbox {...props} />;
  }
}
