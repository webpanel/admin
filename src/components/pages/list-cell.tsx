import * as React from 'react';

import { EntityField } from '../../model/EntityField';
import { ResourceCollection } from 'webpanel-data';
import { Button, Popconfirm } from 'antd';

export interface IListCellProps {
  collection: ResourceCollection;
  values: any;
  field: EntityField<any, any>;
  editable: boolean;
}

export interface ListCellState {
  currentValue?: any;
  value?: any;
  valueElement?: React.ReactNode;
}

export class ListCell extends React.Component<IListCellProps> {
  state = {
    currentValue: undefined,
    value: undefined,
    valueElement: undefined
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
    const item = collection.getItem({ id: values.id });

    this.setState({ value });

    let data = {};
    data[field.columnName] = value;
    item.fields = ['id'];
    await item.update(data);
    this.setState({ editing: false, currentValue: this.state.valueElement });
  };

  render() {
    const { values, field, editable } = this.props;
    const { currentValue, value } = this.state;
    return (
      <>
        {currentValue || field.render(values)}
        {editable ? (
          <Popconfirm
            title={field.inputElement({
              value:
                typeof value !== 'undefined' ? value : values[field.columnName],
              onChange: (value: any, valueElement: React.ReactNode) => {
                this.onChange(value, valueElement);
              }
            })}
            onConfirm={() => this.save()}
            onCancel={() => this.cancel()}
          >
            <Button
              shape="circle"
              icon="edit"
              size="small"
              className="no-print"
              style={{ marginLeft: '10px' }}
              onClick={() => this.setState({ editing: true })}
            />
          </Popconfirm>
        ) : null}
      </>
    );
  }
}
