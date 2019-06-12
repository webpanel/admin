import * as React from 'react';
import * as moment from 'moment';

import { DatePicker as AntdDatePicker } from 'antd';

export class DatePicker extends React.Component<{
  value?: string | null;
  onChange?: (value: string | null) => void;
  showTime?: boolean;
  format?: string;
}> {
  getFormat() {
    const { showTime, format } = this.props;
    if (format) {
      return format;
    }
    return showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
  }

  public render(): React.ReactNode {
    const { onChange, value } = this.props;
    return (
      <AntdDatePicker
        showTime={true}
        format={this.getFormat()}
        defaultPickerValue={moment()
          .minute(0)
          .seconds(0)}
        value={value ? moment(value) : undefined}
        onChange={(val: moment.Moment) => {
          if (onChange) {
            onChange((val && val.toISOString()) || null);
          }
        }}
      />
    );
  }
}
