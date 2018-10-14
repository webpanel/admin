import * as React from 'react';
import { EntityField } from '../EntityField';
import { InputNumber } from 'antd';

export class EntityFieldNumber<T, C> extends EntityField<T, C> {
  public inputElement(props?: {
    value?: any;
    onChange?: (value: any) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    return <InputNumber {...props} />;
  }
}
