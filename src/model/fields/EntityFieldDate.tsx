import * as React from "react";
import * as moment from "moment";

import {
  EntityField,
  IEntityFieldConfig,
  IEntityFieldConfigFilter,
  IEntityFieldFilterProps,
  IEntityFieldRenderOptions,
} from "../EntityField";

import { DatePicker as AntdDatePicker } from "antd";
import { DatePicker } from "../../components/date-picker";
import { RangeValue } from "rc-picker/lib/interface";
import { EntityBase } from "../EntityBase";

export interface IEntityFieldDateConfig<T> extends IEntityFieldConfig<T> {
  showTime?: boolean;
  format?: string;
}

export const dateFieldFilter = (
  columnName: string,
  range?: boolean,
  format?: string,
  showTime?: boolean
): IEntityFieldConfigFilter => {
  return {
    dropdownInput: (props) => {
      const value = props.selectedKeys;
      return range ? (
        <AntdDatePicker.RangePicker
          format={format || showTime ? "YYYY/MM/DD HH:mm" : "YYYY/MM/DD"}
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
    },
    normalizer: (values: moment.Moment[] | null) => {
      let res = {};
      values = values || [];
      if (values.length == 1) {
        res[columnName] = moment(values[0]).toISOString();
      } else if (values.length === 2) {
        res[columnName + "_gte"] = moment(values[0]).toISOString();
        res[columnName + "_lte"] = moment(values[1]).toISOString();
      }
      return res;
    },
    denormalizer: (values: { [key: string]: any }): any[] => {
      let res: any[] = [];
      if (values[columnName]) {
        res = [moment(values[columnName])];
      } else if (values[columnName + "_gte"] && values[columnName + "_lte"]) {
        res = [
          moment(values[columnName + "_gte"]),
          moment(values[columnName + "_lte"]),
        ];
      }
      return res;
    },
  };
};

export class EntityFieldDate<
  T,
  C extends IEntityFieldDateConfig<T>
> extends EntityField<T, C> {
  private filterConfig: IEntityFieldConfigFilter;

  constructor(
    public readonly name: string,
    protected readonly config: C,
    public readonly _entity: EntityBase
  ) {
    super(name, config, _entity);
    this.filterConfig = dateFieldFilter(
      this.columnName(),
      this.range,
      this.format,
      this.config.showTime
    );
  }

  private get format(): string {
    return (
      this.config.format ||
      (this.config.showTime ? "YYYY/MM/DD HH:mm" : "YYYY/MM/DD")
    );
  }

  private renderValue(value: moment.Moment | string | null): React.ReactNode {
    if (value === null) {
      return "-";
    }

    const d = moment(value);
    if (d.isValid()) {
      return d.format(this.format);
    } else {
      return "-";
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
        key={`date_field_${this._entity.name}_${this.valuePropName}`}
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
    return (
      this.filterConfig.dropdownInput && this.filterConfig.dropdownInput(props)
    );
  };

  public get filterNormalize(): (values: moment.Moment[]) => {
    [key: string]: any;
  } {
    return this.filterConfig.normalizer!;
  }
  public get filterDenormalize(): (values: { [key: string]: any }) => any[] {
    return this.filterConfig.denormalizer!;
  }
}
