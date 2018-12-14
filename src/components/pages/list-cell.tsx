import * as React from 'react';

import { EntityField } from '../../model/EntityField';
import { ResourceCollection } from 'webpanel-data';
// import { Popconfirm } from 'antd';

export interface IListCellProps {
  collection: ResourceCollection;
  values: any;
  field: EntityField<any, any>;
  editable: boolean;
  // isEditing: boolean;
  // onClick?: () => void;
  // onChange?: (value: any) => void;
  // onSave?: () => void;
  // onCancel?: () => void;
}

export interface ListCellState {
  value?: any;
}

export class ListCell extends React.Component<IListCellProps> {
  state = { value: undefined };
  // componentDidMount() {
  //   document.addEventListener('click', this.handleClickOutside, true);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('click', this.handleClickOutside, true);
  // }

  // handleClickOutside = () => {
  //   this.props.onSave();
  // };

  onChange = async (value: any) => {
    const { collection, field, values } = this.props;
    const item = collection.getItem({ id: values.id });

    this.setState({ value });

    let data = {};
    data[field.columnName] = value;
    item.fields = ['id'];
    await item.update(data);
  };

  render() {
    const { values, field, editable } = this.props;
    const { value } = this.state;
    return editable
      ? field.inputElement({
          value:
            typeof value !== 'undefined' ? value : values[field.columnName],
          onChange: value => {
            this.onChange(value);
          },
          autoFocus: true
        })
      : field.render(values);
  }
}
