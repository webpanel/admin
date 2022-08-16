import * as React from "react";
import * as numeral from "numeral";

import {
  EntityField,
  IEntityFieldConfig,
  IEntityFieldFilterProps,
} from "../EntityField";

import { IEntityListColumnAlign } from "../../components/pages/list";
import { InputNumber } from "antd";
import { InputNumberProps } from "antd/lib/input-number";
import { EntityBase } from "../EntityBase";

export const PercentageInput = (props: InputNumberProps) => {
  const { value, onChange, ...rest } = props;
  return (
    <InputNumber
      value={value && value * 100}
      onChange={(v) =>
        onChange &&
        onChange(v && 0.01 * (typeof v === "string" ? parseInt(v, 10) : v))
      }
      formatter={(value) => `${value}%`}
      parser={(value) => (value && value.replace("%", "")) || ""}
      {...rest}
    />
  );
};

export interface IEntityFieldPercentageConfig<T>
  extends IEntityFieldConfig<T> {}
export class EntityFieldPercentage<T> extends EntityField<
  T,
  IEntityFieldPercentageConfig<T>
> {
  constructor(
    public readonly name: string,
    protected readonly config: IEntityFieldPercentageConfig<T>,
    public readonly _entity: EntityBase
  ) {
    super(name, config, _entity);

    if (typeof config.render === "undefined") {
      this.config.render = (values) => numeral(values[name]).format("%");
    }
  }

  public get listColumnAlign(): IEntityListColumnAlign {
    return this.config.listColumnAlign || "right";
  }

  public inputElement(props?: {
    value?: any;
    onChange?: (value: any, valueElement: React.ReactNode) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    const onChange = props && props.onChange;
    const onChangeProp = onChange
      ? (value: number | string | undefined) => onChange(value, value)
      : undefined;

    return (
      <PercentageInput
        style={{ minWidth: "195px", width: "100%" }}
        key={`number_field_${this._entity.name}_${this.valuePropName}`}
        {...props}
        onChange={onChangeProp}
      />
    );
  }

  public filterDropdownInput = (props: IEntityFieldFilterProps<number>) => {
    const value = props.selectedKeys ? props.selectedKeys[0] : undefined;
    return (
      <PercentageInput
        style={{ minWidth: "195px" }}
        key={`number_field_${this._entity.name}_${this.valuePropName}`}
        placeholder="Number"
        value={value}
        onChange={(value: number) =>
          props.setSelectedKeys(value ? [value] : [])
        }
      />
    );
  };

  public get filterNormalize(): (values: any[]) => { [key: string]: any } {
    return (values: string[] | null) => {
      let res = {};
      values = values || [];
      if (values.length == 1) {
        res[this.columnName()] = parseFloat(values[0]);
      } else if (values.length === 2) {
        res[this.columnName() + "_gte"] = parseFloat(values[0]);
        res[this.columnName() + "_lte"] = parseFloat(values[1]);
      }
      return res;
    };
  }
  public get filterDenormalize(): (values: { [key: string]: any }) => any[] {
    return (values: { [key: string]: any }) => {
      let res: any[] = [];
      if (values[this.columnName()]) {
        res = [values[this.columnName()].toString()];
      } else if (
        values[this.columnName() + "_gte"] &&
        values[this.columnName() + "_lte"]
      ) {
        res = [
          values[this.columnName() + "_gte"].toString(),
          values[this.columnName() + "_lte"].toString(),
        ];
      }
      return res;
    };
  }
}
