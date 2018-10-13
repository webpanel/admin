import * as React from 'react';
import { EntityField } from '../EntityField';
import { Input } from 'antd';

export class EntityFieldText<T, C> extends EntityField<T, C> {
  public inputElement(): React.ReactNode {
    return <Input.TextArea />;
  }
}
