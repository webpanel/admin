import * as React from "react";

import { Button, Popover } from "antd";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";

import { EntityField } from "../../model/EntityField";
import { ResourceCollection } from "webpanel-data";

export interface IListCellProps {
  collection: ResourceCollection<any>;
  values: any;
  field: EntityField<any, any>;
  fields: EntityField<any, any>[];
  editable: boolean;
}

export interface IListCellState {
  currentValue?: any;
  value?: any;
  valueElement?: React.ReactNode;
  editing: boolean;
  saving: boolean;
}

export const ListCell = (props: IListCellProps) => {
  const [currentValue, setCurrentvalue] = React.useState<any>();
  // const [value, setValue] = React.useState<any>();
  const [saving, setSaving] = React.useState(false);
  const [editing, setEditing] = React.useState(false);

  const save = async (value: any) => {
    const { collection, field, values } = props;

    setSaving(true);

    const data = {};
    data[field.columnName()] = value;

    const item = await collection.patchItemValues(values.id, data);

    setSaving(false);
    setCurrentvalue(field.render(item.data, { size: "small" }));
  };

  const { values, field, editable } = props;
  return (
    <>
      {currentValue || field.render(values, { size: "small" })}
      {editable ? (
        <Popover
          content={
            <div style={{ width: 200 }}>
              {field.inputElement({
                value: values[field.columnName()],
                onChange: async (value: any, valueElement: React.ReactNode) => {
                  setEditing(false);
                  await save(value);
                },
              })}
            </div>
          }
          trigger="click"
          onVisibleChange={(visible) => {
            setEditing(visible);
          }}
          visible={editing}
        >
          {saving ? (
            <LoadingOutlined />
          ) : (
            <Button
              shape="circle"
              icon={<EditOutlined />}
              size="small"
              className="no-print"
              style={{ marginLeft: "10px" }}
              onClick={() => setEditing(true)}
            />
          )}
        </Popover>
      ) : null}
    </>
  );
};
