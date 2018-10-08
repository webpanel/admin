import { DatePicker as AntdDatePicker } from 'antd';
import * as moment from 'moment';
import * as React from 'react';

export class DatePicker extends React.Component<{
  value?: string | null;
  onChange?: (value: string | null) => {};
}> {
  public render() {
    const { onChange, value } = this.props;
    return (
      <AntdDatePicker
        showTime={true}
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
