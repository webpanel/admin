import { DatePicker as AntdDatePicker, Button } from 'antd';
import * as React from 'react';
import * as moment from 'moment';
import { EntityField, IEntityFieldConfig } from '../EntityField';

import { DatePicker } from '../../components/date-picker';
import { ResourceCollection } from 'webpanel-data';

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

  public get render(): ((record: T) => React.ReactNode) {
    return values => {
      const d = moment(values[this.name]);
      if (d.isValid()) {
        return d.format(this.format);
      } else {
        return '–';
      }
    };
  }

  public isFiltered(resource: ResourceCollection): boolean {
    return (
      this.valueForFilterField(resource, 'gte') ||
      this.valueForFilterField(resource, 'lte')
    );
  }

  public filterDropdownInput = (resource: ResourceCollection) => {
    return (
      <>
        {this.range ? (
          <AntdDatePicker.RangePicker
            format={this.config.format}
            defaultValue={[
              this.valueForFilterField(resource, 'gte'),
              this.valueForFilterField(resource, 'lte')
            ]}
            onChange={(value: any) => {
              this.updateFilterField(
                resource,
                'gte',
                moment(value[0])
                  .startOf('day')
                  .toISOString()
              );
              this.updateFilterField(
                resource,
                'lte',
                moment(value[1])
                  .endOf('day')
                  .toISOString()
              );
            }}
          />
        ) : (
          <DatePicker
            value={this.valueForFilterField(resource, 'gte')}
            onChange={(value: string) => {
              this.updateFilterField(
                resource,
                'gte',
                moment(value)
                  .startOf('day')
                  .toISOString()
              );
              this.updateFilterField(
                resource,
                'lte',
                moment(value)
                  .endOf('day')
                  .toISOString()
              );
            }}
          />
        )}
        <Button
          disabled={!this.isFiltered(resource)}
          onClick={() => this.clearFilters(resource)}
          icon="delete"
        />
      </>
    );
  };

  public inputElement(props?: {
    value?: any;
    onChange?: (value: any) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    return (
      <DatePicker
        showTime={this.config.showTime}
        format={this.format}
        {...props}
      />
    );
  }
}
