import { DatePicker as AntdDatePicker } from 'antd';
import * as React from 'react';
import * as moment from 'moment';
import {
  EntityField,
  IEntityFieldConfig,
  IEntityFieldFilterProps
} from '../EntityField';

import { DatePicker } from '../../components/date-picker';
import { RangePickerValue } from 'antd/lib/date-picker/interface';

export interface IEntityFieldDateConfig<T> extends IEntityFieldConfig<T> {
  showTime?: boolean;
  format?: string;
}

export class EntityFieldDate<T> extends EntityField<
  T,
  IEntityFieldDateConfig<T>
> {
  private get format(): string {
    return (
      this.config.format ||
      (this.config.showTime ? 'YYYY/MM/DD HH:mm' : 'YYYY/MM/DD')
    );
  }

  private renderValue(value: moment.Moment | string | null): React.ReactNode {
    if (value === null) {
      return '–';
    }

    const d = moment(value);
    if (d.isValid()) {
      return d.format(this.format);
    } else {
      return '–';
    }
  }

  public get render(): ((record: T) => React.ReactNode) {
    return values => {
      return this.renderValue(values[this.name]);
    };
  }

  public inputElement(props?: {
    value?: any;
    onChange?: (value: any, valueElement: React.ReactNode) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    const onChange = props && props.onChange;
    const onChangeProp = onChange
      ? (value: string | null) => onChange(value, this.renderValue(value))
      : undefined;

    return (
      <DatePicker
        showTime={this.config.showTime}
        format={this.format}
        {...props}
        onChange={onChangeProp}
      />
    );
  }

  public filterDropdownInput = (
    props: IEntityFieldFilterProps<moment.Moment>
  ) => {
    const value = props.selectedKeys;
    return this.range ? (
      <AntdDatePicker.RangePicker
        format={this.config.format}
        allowClear={false}
        value={[value[0] && moment(value[0]), value[1] && moment(value[1])]}
        onChange={(dates: RangePickerValue) => {
          props.setSelectedKeys([
            moment(dates[0]).startOf('day'),
            moment(dates[1]).endOf('day')
          ]);
        }}
      />
    ) : (
      <AntdDatePicker
        value={value[0]}
        allowClear={false}
        onChange={(date: moment.Moment) => {
          props.setSelectedKeys([
            moment(date).startOf('day'),
            moment(date).endOf('day')
          ]);
        }}
      />
    );
  };

  public get filterFormatter(): ((
    values: moment.Moment[]
  ) => { [key: string]: any }) {
    return (values: moment.Moment[]) => {
      let res = {};
      if (values.length == 1) {
        res[this.columnName()] = moment(values[0]).toISOString();
      } else if (values.length === 2) {
        res[this.columnName() + '_gte'] = moment(values[0]).toISOString();
        res[this.columnName() + '_lte'] = moment(values[1]).toISOString();
      }
      return res;
    };
  }
}
