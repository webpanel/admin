import * as React from 'react';
import * as moment from 'moment';
import { EntityField, IEntityFieldConfig } from '../EntityField';

import { DatePicker } from '../../components/date-picker';

export interface IEntityFieldDateConfig<T> extends IEntityFieldConfig<T> {
  showTime?: boolean;
}

export class EntityFieldDate<T> extends EntityField<
  T,
  IEntityFieldDateConfig<T>
> {
  public get render(): ((record: T) => React.ReactNode) {
    return values => moment(values[this.name]).calendar();
  }
  public inputElement(props?: {
    value?: any;
    onChange?: (value: any) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    return <DatePicker showTime={this.config.showTime} {...props} />;
  }
}
