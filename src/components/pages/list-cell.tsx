import * as React from 'react';

import { EntityField } from '../../model/EntityField';
import { ResourceCollection } from 'webpanel-data';

export interface IListCellProps {
  collection: ResourceCollection;
  values: any;
  field: EntityField<any, any>;
  editable: boolean;
}

export interface ListCellState {
  value?: any;
}

export class ListCell extends React.Component<IListCellProps> {
  state = { value: undefined };

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
          }
        })
      : field.render(values);
  }
}
