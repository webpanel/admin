import * as React from "react";

import { Button, Popconfirm } from "antd";

import { EntityField } from "../../model/EntityField";

interface IEntityFieldEditButtonProps {
  value: any;
  field: EntityField<any, any>;
  onChange: (value: any) => Promise<void>;
  saving?: boolean;
}

export const EntityFieldEditButton = (props: IEntityFieldEditButtonProps) => {
  const { field, value: currentValue, onChange } = props;
  const [newValue, setNewValue] = React.useState(null);

  return (
    <Popconfirm
      title={field.inputElement({
        value: newValue || currentValue,
        onChange: (value: any) => {
          setNewValue(value);
        },
      })}
      onConfirm={async () => await onChange(newValue)}
      onCancel={() => setNewValue(null)}
    >
      <Button shape="circle" icon="edit" size="small" className="no-print" />
    </Popconfirm>
  );
};
