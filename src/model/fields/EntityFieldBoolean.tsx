import * as React from "react";

import { Checkbox, Select } from "antd";
import {
  EntityField,
  IEntityFieldConfig,
  IEntityFieldFilterProps,
  IEntityFieldRenderOptions
} from "../EntityField";

import { CheckboxChangeEvent } from "antd/lib/checkbox";

export interface IEntityFieldBooleanConfig<T> extends IEntityFieldConfig<T> {}

export class EntityFieldBoolean<T> extends EntityField<
  T,
  IEntityFieldBooleanConfig<T>
> {
  public get valuePropName(): string {
    return "checked";
  }

  private renderValue(value: boolean): React.ReactNode {
    if (value === null || typeof value === "undefined") {
      return "–";
    }
    return value ? "✓" : "✗";
  }

  public get render(): (
    record: T,
    options?: IEntityFieldRenderOptions
  ) => React.ReactNode {
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
    return (
      <Checkbox
        key={`boolean_field_${this.entity.name}_${this.valuePropName}`}
        {...props}
        onChange={onChangeProp}
      />
    );
  }

  public filterDropdownInput = (props: IEntityFieldFilterProps<string>) => {
    const value =
      props.selectedKeys.length == 1 ? (props.selectedKeys[0] ? 1 : 0) : null;
    return (
      <Select
        style={{
          minWidth: "200px"
        }}
        value={value}
        onChange={(value: any) => props.setSelectedKeys([value])}
        showSearch={false}
        allowClear={false}
      >
        <Select.Option value={0}>✗</Select.Option>
        <Select.Option value={1}>✓</Select.Option>
      </Select>
    );
  };

  public get filterNormalize(): (values: boolean[]) => { [key: string]: any } {
    return (values: boolean[]) => {
      let res = {};
      if (values.length >= 1) {
        res[this.columnName()] = !!values[0];
      }
      return res;
    };
  }
  public get filterDenormalize(): (values: { [key: string]: any }) => any[] {
    return (values: { [key: string]: any }) => {
      let res: any[] = [];
      if (values[this.columnName()]) {
        res = [values[this.columnName()]];
      }
      return res;
    };
  }
}
