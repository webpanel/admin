import * as React from 'react';

import { EntityField } from '../../model/EntityField';
// import { Popconfirm } from 'antd';

export interface IDataGridCellProps {
  values: any;
  field: EntityField<any, any>;
  isEditing: boolean;
  onClick?: () => void;
  onChange?: (value: any) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export class DataGridCell extends React.Component<IDataGridCellProps> {
  // componentDidMount() {
  //   document.addEventListener('click', this.handleClickOutside, true);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('click', this.handleClickOutside, true);
  // }

  // handleClickOutside = () => {
  //   this.props.onSave();
  // };

  render() {
    const {
      values,
      field,
      isEditing,
      onClick,
      onChange
      // onSave,
      // onCancel
    } = this.props;
    return (
      <span onClick={() => onClick && onClick()}>
        {isEditing
          ? // <Popconfirm
            //   title={null}
            //   icon={null}
            //   okText="✓"
            //   cancelText="✗"
            //   placement="bottomRight"
            //   visible={true}
            //   onConfirm={onSave}
            //   onCancel={onCancel}
            // >
            field.inputElement({
              value: values[field.columnName],
              onChange: onChange,
              autoFocus: true
            })
          : // </Popconfirm>
            field.render(values)}
      </span>
    );
  }
}
