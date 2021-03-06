import * as React from "react";
import * as moment from "moment";

import {
  EntityField,
  IEntityFieldConfig,
  IEntityFieldFilterProps,
  IEntityFieldRenderOptions,
} from "../EntityField";

import { DatePicker as AntdDatePicker } from "antd";
import { DatePicker } from "../../components/date-picker";
import { RangeValue } from "rc-picker/lib/interface";

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
      (this.config.showTime ? "YYYY/MM/DD HH:mm" : "YYYY/MM/DD")
    );
  }

  private renderValue(value: moment.Moment | string | null): React.ReactNode {
    if (value === null) {
      return "–";
    }

    const d = moment(value);
    if (d.isValid()) {
      return d.format(this.format);
    } else {
      return "–";
    }
  }

  public get render(): (
    record: T,
    options?: IEntityFieldRenderOptions
  ) => React.ReactNode {
    return (values) => {
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
        key={`date_field_${this.entity.name}_${this.valuePropName}`}
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
        onChange={(dates: RangeValue<any>) => {
          if (dates != null) {
            props.setSelectedKeys([
              moment(dates[0] || undefined).startOf("day"),
              moment(dates[1] || undefined).endOf("day"),
            ]);
          }
        }}
      />
    ) : (
      <AntdDatePicker
        value={value[0]}
        allowClear={false}
        onChange={(date: moment.Moment) => {
          props.setSelectedKeys([
            moment(date).startOf("day"),
            moment(date).endOf("day"),
          ]);
        }}
      />
    );
  };

  public get filterNormalize(): (
    values: moment.Moment[]
  ) => { [key: string]: any } {
    return (values: moment.Moment[] | null) => {
      let res = {};
      values = values || [];
      if (values.length == 1) {
        res[this.columnName()] = moment(values[0]).toISOString();
      } else if (values.length === 2) {
        res[this.columnName() + "_gte"] = moment(values[0]).toISOString();
        res[this.columnName() + "_lte"] = moment(values[1]).toISOString();
      }
      return res;
    };
  }
  public get filterDenormalize(): (values: { [key: string]: any }) => any[] {
    return (values: { [key: string]: any }) => {
      let res: any[] = [];
      if (values[this.columnName()]) {
        res = [moment(values[this.columnName()])];
      } else if (
        values[this.columnName() + "_gte"] &&
        values[this.columnName() + "_lte"]
      ) {
        res = [
          moment(values[this.columnName() + "_gte"]),
          moment(values[this.columnName() + "_lte"]),
        ];
      }
      return res;
    };
  }
}
