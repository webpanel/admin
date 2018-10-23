import * as React from 'react';
import { EntityField, IEntityFieldConfig } from '../EntityField';

import { Select } from 'antd';
import { Thunk, resolveThunk } from 'ts-thunk';

export interface IOption {
  value: string;
  label: string;
}

export interface IEntityFieldEnumConfig<T> extends IEntityFieldConfig<T> {
  options: Thunk<IOption[]>;
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
    const selectOptions = resolveThunk(this.config.options)
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
