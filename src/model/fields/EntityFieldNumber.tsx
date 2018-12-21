import * as React from 'react';
import { EntityField, IEntityFieldFilterProps } from '../EntityField';
import { InputNumber } from 'antd';

export class EntityFieldNumber<T, C> extends EntityField<T, C> {
  public inputElement(props?: {
    value?: any;
    onChange?: (value: any, valueElement: React.ReactNode) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    const onChange = props && props.onChange;
    const onChangeProp = onChange
      ? (value: number | string | undefined) => onChange(value, value)
      : undefined;

    return <InputNumber {...props} onChange={onChangeProp} />;
  }

  public filterDropdownInput = (props: IEntityFieldFilterProps<number>) => {
    const value = props.selectedKeys ? props.selectedKeys[0] : undefined;
    return (
      <InputNumber
        placeholder="Number"
        value={value}
        onChange={(value: number) =>
          props.setSelectedKeys(value ? [value] : [])
        }
      />
    );
  };

  public get filterFormatter(): ((values: any[]) => { [key: string]: any }) {
    return (values: string[]) => {
      let res = {};
      if (values.length == 1) {
        res[this.columnName] = parseFloat(values[0]);
      } else if (values.length === 2) {
        res[this.columnName + '_gte'] = parseFloat(values[0]);
        res[this.columnName + '_lte'] = parseFloat(values[1]);
      }
      return res;
    };
  }
}
