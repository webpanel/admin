import * as React from 'react';
import { EntityField } from '../EntityField';

export class EntityFieldColor<T, C> extends EntityField<T, C> {
  private renderValue(value?: string): React.ReactNode {
    return value ? (
      <div
        style={{
          width: '30px',
          height: '20px',
          backgroundColor: value,
          borderRadius: '3px'
        }}
      />
    ) : (
      '–'
    );
  }

  public get render(): ((record: T) => React.ReactNode) {
    return (values: any) => {
      const color = values[this.name];
      return this.renderValue(color);
    };
  }

  public inputElement(props?: {
    value?: any;
    onChange?: (value: any, valueElement: React.ReactNode) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    const onChange = props && props.onChange;
    const onChangeProp = onChange
      ? (event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value, this.renderValue(event.target.value))
      : undefined;

    return <input type="color" {...props} onChange={onChangeProp} />;
  }
}
