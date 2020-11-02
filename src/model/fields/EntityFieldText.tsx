import * as React from "react";

import {
  EntityField,
  IEntityFieldConfig,
  IEntityFieldRenderOptions,
} from "../EntityField";
import { Input, Tooltip } from "antd";

export class EntityFieldText<
  T,
  C extends IEntityFieldConfig<T>
> extends EntityField<T, C> {
  public inputElement(props?: {
    value?: any;
    onChange?: (value: any, valueElement: React.ReactNode) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    const onChange = props && props.onChange;
    const onChangeProp = onChange
      ? (e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange(e.target.value, e.target.value)
      : undefined;

    return (
      <Input.TextArea
        key={`text_field_${this.entity.name}_${this.valuePropName}`}
        {...props}
        autoSize={{ minRows: 2, maxRows: 8 }}
        onChange={onChangeProp}
      />
    );
  }

  public get filterNormalize(): (values: any[]) => { [key: string]: any } {
    return (values: string[]) => {
      let res = {};
      if (values.length == 1) {
        res[this.columnName() + "_contains"] = values[0];
      } else if (values.length > 1) {
        res[this.columnName() + "_in"] = values;
      }
      return res;
    };
  }

  public get filterDenormalize(): (values: { [key: string]: any }) => any[] {
    return (values: { [key: string]: any }) => {
      let res: any[] = [];
      if (values[this.columnName() + "_contains"]) {
        res = [values[this.columnName() + "_contains"]];
      } else if (values[this.columnName() + "_in"]) {
        res = values[this.columnName() + "_in"];
      }
      return res;
    };
  }

  public get render(): (
    record: T,
    options?: IEntityFieldRenderOptions
  ) => React.ReactNode {
    if (this.config.render) {
      return this.config.render;
    }
    return (values: T, options?: IEntityFieldRenderOptions) => {
      let value = values[this.name] || "";
      if (!value || !value.substring || value.length < 50) {
        return value;
      }
      if (options?.size === "small") {
        const shortValue = value.substring(0, 50) + "...";
        return <Tooltip title={value}>{shortValue}</Tooltip>;
      }

      return <pre>{value}</pre>;
    };
  }
}
