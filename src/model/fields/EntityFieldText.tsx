import * as React from 'react';
import { EntityField } from '../EntityField';
import { Input } from 'antd';

export class EntityFieldText<T, C> extends EntityField<T, C> {
  public inputElement(props?: {
    value?: any;
    onChange?: (value: any) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    const onChange = props && props.onChange;
    const onChangeProp = onChange
      ? (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)
      : undefined;

    return <Input.TextArea {...props} autosize={{minRows:2, maxRows: 8}} onChange={onChangeProp} />;
  }
}
