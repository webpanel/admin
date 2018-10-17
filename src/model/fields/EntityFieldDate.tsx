import * as React from 'react';
import * as moment from 'moment';
import { EntityField, IEntityFieldConfig } from '../EntityField';

import { DatePicker } from '../../components/date-picker';

export interface IEntityFieldDateConfig<T> extends IEntityFieldConfig<T> {
  showTime?: boolean;
  format?: string;
  render?: (date: any) => string;
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
    return values =>
      this.config.render
        ? this.config.render(values)
        : moment(values[this.name]).format(this.format);
  }

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
