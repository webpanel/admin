import * as React from 'react';
import { EntityField } from '../EntityField';

export class EntityFieldColor<T, C> extends EntityField<T, C> {
  public inputElement(props?: {
    value?: any;
    onChange?: (value: any) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    return (
      <input
        type="color"
        {...props}
      />
    );
  }
}
