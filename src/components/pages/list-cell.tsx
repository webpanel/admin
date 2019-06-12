import * as React from 'react';

import { Button, Icon, Popconfirm } from 'antd';

import { EntityField } from '../../model/EntityField';
import { ResourceCollection } from 'webpanel-data';

export interface IListCellProps {
  collection: ResourceCollection;
  values: any;
  field: EntityField<any, any>;
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
  state = {
    currentValue: undefined,
    value: undefined,
    valueElement: undefined,
    editing: false,
    saving: false
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

    this.setState({ value, saving: true });

    let data = {};
    data[field.columnName()] = value;
    item.fields = ['id'];
    await item.update(data);
    this.setState({
      editing: false,
      saving: false,
      currentValue: this.state.valueElement
    });
  };

  render(): React.ReactNode {
    const { values, field, editable } = this.props;
    const { currentValue, value, saving } = this.state;
    return (
      <>
        {currentValue || field.render(values)}
        {editable ? (
          <Popconfirm
            title={field.inputElement({
              value:
                typeof value !== 'undefined'
                  ? value
                  : values[field.columnName()],
              onChange: (value: any, valueElement: React.ReactNode) => {
                this.onChange(value, valueElement);
              }
            })}
            onConfirm={() => this.save()}
            onCancel={() => this.cancel()}
          >
            {saving ? (
              <Icon type="loading" />
            ) : (
              <Button
                shape="circle"
                icon="edit"
                size="small"
                className="no-print"
                style={{ marginLeft: '10px' }}
                onClick={() => this.setState({ editing: true })}
              />
            )}
          </Popconfirm>
        ) : null}
      </>
    );
  }
}
