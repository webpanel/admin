import * as React from "react";
import * as numeral from "numeral";

import {
  EntityField,
  IEntityFieldConfig,
  IEntityFieldFilterProps,
} from "../EntityField";

import { Entity } from "../Entity";
import { IEntityListColumnAlign } from "../../components/pages/list";
import { InputNumber } from "antd";

const formatter = (
  value: string | number | undefined,
  format?: string
): string => {
  return numeral(value).format(format || "0,0");
  // return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
const parser = (value: string): string => {
  if (!value) {
    return "";
  }
  return numeral(value).format("0");
  // return value.replace(/\s?|(\s*)/g, "");
};

export interface IEntityFieldNumberConfig<T> extends IEntityFieldConfig<T> {
  format?: string;
}
export class EntityFieldNumber<T> extends EntityField<
  T,
  IEntityFieldNumberConfig<T>
> {
  constructor(
    public readonly name: string,
    protected readonly config: IEntityFieldNumberConfig<T>,
    public readonly entity: Entity
  ) {
    super(name, config, entity);

    if (typeof config.render === "undefined") {
      this.config.render = (values) =>
        numeral(values[name]).format(config.format || "0,0");
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
      <InputNumber
        style={{ minWidth: "195px", width: "100%" }}
        key={`number_field_${this.entity.name}_${this.valuePropName}`}
        formatter={(value) => formatter(value, this.config.format)}
        parser={(value) => {
          console.log("???", value, parser(value || ""));
          return parser(value || "");
        }}
        {...props}
        onChange={onChangeProp}
      />
    );
  }

  public filterDropdownInput = (props: IEntityFieldFilterProps<number>) => {
    const value = props.selectedKeys ? props.selectedKeys[0] : undefined;
    return (
      <InputNumber
        style={{ minWidth: "195px" }}
        key={`number_field_${this.entity.name}_${this.valuePropName}`}
        placeholder="Number"
        value={value}
        onChange={(value: number) =>
          props.setSelectedKeys(value ? [value] : [])
        }
        formatter={(value) => formatter(value)}
        parser={(value) => parser(value || "")}
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
