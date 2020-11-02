import * as React from "react";

import { Button, Popconfirm } from "antd";
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

export class ListCell extends React.Component<IListCellProps, IListCellState> {
  state: IListCellState = {
    editing: false,
    saving: false,
  };

  onChange = async (value: any, valueElement: React.ReactNode) => {
    this.setState({ value, valueElement });
  };
  cancel = () => {
    this.setState({ editing: false });
  };

  save = async () => {
    const { collection, field, values } = this.props;
    const { value } = this.state;

    this.setState({ saving: true });

    const data = {};
    data[field.columnName()] = value;

    const item = await collection.patchItemValues(values.id, data);

    this.setState({
      editing: false,
      saving: false,
      currentValue: field.render(item.data, { size: "small" }),
    });
  };

  render(): React.ReactNode {
    const { values, field, editable } = this.props;
    const { currentValue, value, saving } = this.state;
    return (
      <>
        {currentValue || field.render(values, { size: "small" })}
        {editable ? (
          <Popconfirm
            title={field.inputElement({
              value:
                typeof value !== "undefined"
                  ? value
                  : values[field.columnName()],
              onChange: (value: any, valueElement: React.ReactNode) => {
                this.onChange(value, valueElement);
              },
            })}
            onConfirm={() => this.save()}
            onCancel={() => this.cancel()}
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
                onClick={() => this.setState({ editing: true })}
              />
            )}
          </Popconfirm>
        ) : null}
      </>
    );
  }
}
