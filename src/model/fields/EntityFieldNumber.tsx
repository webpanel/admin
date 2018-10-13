import * as React from 'react';
import { EntityField } from '../EntityField';
import { InputNumber } from 'antd';

export class EntityFieldNumber<T, C> extends EntityField<T, C> {
  public inputElement(): React.ReactNode {
    return <InputNumber />;
  }
}
