import * as React from 'react';
import { EntityField, IEntityFieldConfig } from '../EntityField';

import { Select } from 'antd';

export interface IOption {
  value: string;
  label: string;
}

export interface IEntityFieldEnumConfig<T> extends IEntityFieldConfig<T> {
  options: IOption[];
}

export class EntityFieldEnum<T> extends EntityField<
  T,
  IEntityFieldEnumConfig<T>
> {
  public inputElement(props?: {
    value?: any;
    onChange?: (value: any) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    const selectOptions = this
      .config
      .options
      .map(
      (value: IOption) => (
        <Select.Option value={value.value}>
          {value.label}
        </Select.Option>
      ));

    return (
      <Select {...props}>
        {selectOptions}
      </Select>
    );
  }
}
