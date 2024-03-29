import * as React from "react";

import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Checkbox, Select } from "antd";
import { CheckboxChangeEvent, CheckboxProps } from "antd/lib/checkbox";
import {
  EntityField,
  IEntityFieldConfig,
  IEntityFieldFilterProps,
  IEntityFieldRenderOptions,
} from "../EntityField";

export interface IEntityFieldBooleanConfig<T> extends IEntityFieldConfig<T> {}

const IndeterminateCheckbox = (
  props: Omit<CheckboxProps, "onChange"> & { onChange?: (val: boolean) => void }
) => {
  const { value, onChange, ...rest } = props;
  return (
    <Checkbox
      {...rest}
      indeterminate={value === null || typeof value === "undefined"}
      checked={value}
      onChange={(event: CheckboxChangeEvent) => {
        if (onChange) {
          onChange(event.target.checked);
        }
      }}
    />
  );
};

export class EntityFieldBoolean<T> extends EntityField<
  T,
  IEntityFieldBooleanConfig<T>
> {
  // public get valuePropName(): string {
  //   return "checked";
  // }

  private renderValue(value: boolean): React.ReactNode {
    if (value === null || typeof value === "undefined") {
      return "–";
    }
    return value ? <CheckOutlined /> : <CloseOutlined />;
  }

  public get render(): (
    record: T,
    options?: IEntityFieldRenderOptions
  ) => React.ReactNode {
    return (values) => this.renderValue(values[this.name]);
  }

  public inputElement(props?: {
    value?: any;
    onChange?: (value: any, valueElement: React.ReactNode) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    const { onChange, ...rest } = props || {};
    const onChangeProp = onChange
      ? (value: boolean) => onChange(value, this.renderValue(value))
      : undefined;
    return (
      <IndeterminateCheckbox
        key={`boolean_field_${this._entity.name}_${this.valuePropName}`}
        onChange={onChangeProp}
        {...rest}
      />
    );
  }

  public filterDropdownInput = (props: IEntityFieldFilterProps<string>) => {
    const value =
      props.selectedKeys.length == 1 ? (props.selectedKeys[0] ? 1 : 0) : null;
    return (
      <Select
        style={{
          minWidth: "200px",
        }}
        value={value}
        onChange={(value: any) => props.setSelectedKeys([value])}
        showSearch={false}
        allowClear={false}
      >
        <Select.Option value={0}>
          <CloseOutlined />
        </Select.Option>
        <Select.Option value={1}>
          <CheckOutlined />
        </Select.Option>
      </Select>
    );
  };

  public get filterNormalize(): (values: boolean[]) => { [key: string]: any } {
    return (values: boolean[] | null) => {
      let res = {};
      values = values || [];
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
