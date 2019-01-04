import * as React from 'react';
import { EntityField, IEntityFieldConfig } from '../EntityField';

import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

export interface IEntityFieldBooleanConfig<T> extends IEntityFieldConfig<T> {}

export class EntityFieldBoolean<T> extends EntityField<
  T,
  IEntityFieldBooleanConfig<T>
> {
  public get valuePropName(): string {
    return 'checked';
  }

  private renderValue(value: boolean): React.ReactNode {
    return value ? '✓' : '✗';
  }

  public get render(): ((record: T) => React.ReactNode) {
    return values => this.renderValue(values[this.name]);
  }
  public inputElement(props?: {
    value?: any;
    onChange?: (value: any, valueElement: React.ReactNode) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    const onChange = props && props.onChange;
    const onChangeProp = onChange
      ? (event: CheckboxChangeEvent) =>
          onChange(event.target.value, this.renderValue(event.target.value))
      : undefined;
    return <Checkbox {...props} onChange={onChangeProp} />;
  }

  public get filterFormatter(): ((
    values: boolean[]
  ) => { [key: string]: any }) {
    return (values: boolean[]) => {
      let res = {};
      if (values.length >= 1) {
        res[this.columnName()] = !!values[0];
      }
      return res;
    };
  }
}
