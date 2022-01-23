import * as React from "react";

import { EntityField, IEntityFieldConfig } from "../EntityField";

import { Input } from "antd";
export class EntityFieldString<
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
      ? (e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value, e.target.value)
      : undefined;

    return (
      <Input
        key={`string_field_${this.entity.name}_${this.valuePropName}`}
        {...props}
        {...(this.config.attributes || {})}
        onChange={onChangeProp}
      />
    );
  }
}
