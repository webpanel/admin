import * as React from 'react';
import { EntityField } from '../EntityField';

export class EntityFieldColor<T, C> extends EntityField<T, C> {
  public get render(): ((record: T) => React.ReactNode) {
    return (values: any) => {
      const color = values[this.name];
      return color ? (
        <div
          style={{
            width: '30px',
            height: '20px',
            backgroundColor: color,
            borderRadius: '3px'
          }}
        />
      ) : (
        '–'
      );
    };
  }

  public inputElement(props?: {
    value?: any;
    onChange?: (value: any) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    return <input type="color" {...props} />;
  }
}
