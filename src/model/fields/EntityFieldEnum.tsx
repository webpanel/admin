import * as React from 'react';

import {
  EntityField,
  IEntityFieldConfig,
  IEntityFieldFilterProps
} from '../EntityField';
import { Thunk, resolveThunk } from 'ts-thunk';

import { Select } from 'antd';

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
  public get render(): (record: T) => React.ReactNode {
    if (this.config.render) {
      return this.config.render;
    }
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
        <Select.Option
          key={`enum_field_${this.entity.name}_${this.valuePropName}_${
            value.value
          }`}
          value={value.value}
        >
          {value.label}
        </Select.Option>
      )
    );

    return (
      <Select
        style={{
          width: '100%',
          minWidth: '200px'
        }}
        key={`enum_field_${this.entity.name}_${this.valuePropName}`}
        showSearch={true}
        allowClear={true}
        {...props}
      >
        {selectOptions}
      </Select>
    );
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
        style={{
          minWidth: '200px'
        }}
        value={value}
        onChange={(value: any) => props.setSelectedKeys([value])}
        showSearch={true}
        allowClear={true}
      >
        {selectOptions}
      </Select>
    );
  };

  public get filterNormalize(): (values: string[]) => { [key: string]: any } {
    return (values: string[]) => {
      let res = {};
      if (values.length == 1) {
        res[this.columnName()] = values[0];
      } else if (values.length > 1) {
        res[this.columnName() + '_in'] = values;
      }
      return res;
    };
  }
  public get filterDenormalize(): (values: { [key: string]: any }) => any[] {
    return (values: { [key: string]: any }) => {
      let res: any[] = [];
      if (values[this.columnName()]) {
        res = [values[this.columnName()].toString()];
      } else if (values[this.columnName() + '_in']) {
        res = values[this.columnName() + '_in'];
      }
      return res;
    };
  }
}
