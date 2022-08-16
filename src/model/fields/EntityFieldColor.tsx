import * as React from "react";

import { EntityField, IEntityFieldRenderOptions } from "../EntityField";

export class EntityFieldColor<T, C> extends EntityField<T, C> {
  private renderValue(value?: string): React.ReactNode {
    return value ? (
      <div
        style={{
          width: "30px",
          height: "20px",
          backgroundColor: value,
          borderRadius: "3px",
        }}
      />
    ) : (
      "–"
    );
  }

  public get render(): (
    record: T,
    options?: IEntityFieldRenderOptions
  ) => React.ReactNode {
    return (values: T, options?: IEntityFieldRenderOptions) => {
      const color = values[this.name];
      return this.renderValue(color);
    };
  }

  public inputElement(props?: {
    value?: any;
    onChange?: (value: any, valueElement: React.ReactNode) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    const onChange = props && props.onChange;
    const onChangeProp = onChange
      ? (event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value, this.renderValue(event.target.value))
      : undefined;

    return (
      <input
        key={`color_field_${this._entity.name}_${this.valuePropName}`}
        type="color"
        {...props}
        onChange={onChangeProp}
      />
    );
  }
}
