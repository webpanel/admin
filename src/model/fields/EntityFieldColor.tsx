import { CloseOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import * as React from "react";

import { EntityField, IEntityFieldRenderOptions } from "../EntityField";

interface ColorInputProps {
  value?: string | null;
  onChange: (value: string | null) => void;
}
export const ColorInput = ({ value, onChange }: ColorInputProps) => {
  const [version, setVersion] = React.useState(0);
  return (
    <Space>
      <input
        key={`${version}`}
        value={value || undefined}
        type="color"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.value);
        }}
      />
      <Button
        size="small"
        icon={<CloseOutlined />}
        onClick={() => {
          onChange(null);
          setVersion(version + 1); // force input color value refresh
        }}
      />
    </Space>
  );
};

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
    const { onChange, value } = props!;
    return (
      <ColorInput
        key={`color_field_${this._entity.name}_${this.valuePropName}`}
        value={value}
        onChange={(value: any) =>
          onChange && onChange(value, this.render(value))
        }
      />
    );
  }
}
