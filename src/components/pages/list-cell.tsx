import * as React from "react";

import { Button, Col, Popover, Row } from "antd";
import { EditOutlined, LoadingOutlined, SaveOutlined } from "@ant-design/icons";

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
  const [value, setValue] = React.useState<any | undefined>(undefined);
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
            <div style={{ width: 250 }}>
              <Row gutter={[8, 8]}>
                <Col flex="auto">
                  {field.inputElement({
                    value: value || values[field.columnName()],
                    onChange: async (
                      value: any,
                      valueElement: React.ReactNode
                    ) => {
                      setValue(value);
                    },
                  })}
                </Col>
                <Col flex="32px">
                  <Button
                    icon={<SaveOutlined />}
                    type="primary"
                    onClick={async () => {
                      await save(value);
                      setValue(undefined);
                      setEditing(false);
                    }}
                  />
                </Col>
              </Row>
            </div>
          }
          trigger="click"
          onVisibleChange={(visible) => {
            setEditing(visible);
            if (!visible) {
              setValue(undefined);
            }
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
