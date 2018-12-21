import * as React from 'react';
import {
  EntityField,
  IEntityFieldConfig,
  IEntityFieldFilterProps
} from '../EntityField';

import { Select } from 'antd';
import { Thunk, resolveThunk } from 'ts-thunk';
// import { ResourceCollection } from 'webpanel-data';

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
  public get render(): ((record: T) => React.ReactNode) {
    const options = resolveThunk(this.config.options);
    return values => {
      const keyValue = values[this.name];
      for (let option of options) {
        if (option.value === keyValue) {
          return option.label;
        }
      }
      return '–';
    };
  }

  public inputElement(props?: {
    value?: any;
    onChange?: (value: any, valueElement: React.ReactNode) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    const selectOptions = resolveThunk(this.config.options).map(
      (value: IOption) => (
        <Select.Option value={value.value}>{value.label}</Select.Option>
      )
    );

    return <Select {...props}>{selectOptions}</Select>;
  }

  public filterDropdownInput = (props: IEntityFieldFilterProps<string>) => {
    const selectOptions = resolveThunk(this.config.options).map(
      (value: IOption) => (
        <Select.Option value={value.value}>{value.label}</Select.Option>
      )
    );

    const value = props.selectedKeys;
    return (
      <Select
        value={value}
        onChange={(value: any) => props.setSelectedKeys([value])}
      >
        {selectOptions}
      </Select>
    );
  };

  public get filterFormatter(): ((values: string[]) => { [key: string]: any }) {
    return (values: string[]) => {
      let res = {};
      if (values.length == 1) {
        res[this.columnName] = values[0];
      } else if (values.length > 1) {
        res[this.columnName + '_in'] = values;
      }
      return res;
    };
  }
}
