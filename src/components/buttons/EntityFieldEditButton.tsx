import * as React from "react";

import { Button, Popover } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { EntityField } from "../../model/EntityField";

interface IEntityFieldEditButtonProps {
  value: any;
  field: EntityField<any, any>;
  onChange: (value: any) => Promise<void>;
  saving?: boolean;
}

export const EntityFieldEditButton = (props: IEntityFieldEditButtonProps) => {
  const { field, value: currentValue, onChange } = props;
  // const [newValue, setNewValue] = React.useState(null);
  const [editing, setEditing] = React.useState(false);

  return (
    <Popover
      content={field.inputElement({
        value: currentValue,
        onChange: (value: any) => {
          setEditing(false);
          onChange(value);
        },
      })}
      trigger="click"
      onVisibleChange={(visible) => {
        setEditing(visible);
      }}
      visible={editing}
    >
      <Button
        shape="circle"
        icon={<EditOutlined />}
        size="small"
        className="no-print"
      />
    </Popover>
  );
};
