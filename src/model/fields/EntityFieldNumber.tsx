import * as React from 'react';
import { EntityField } from '../EntityField';
import { InputNumber } from 'antd';
import { ResourceCollection } from 'webpanel-data';

export class EntityFieldNumber<T, C> extends EntityField<T, C> {
  public inputElement(props?: {
    value?: any;
    onChange?: (value: any) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    return <InputNumber {...props} />;
  }

  public filterDropdownInput = (resource: ResourceCollection) => {
    return (
      this.range ?
        (
          <>
            <InputNumber
              placeholder="From"
              onChange={(value: string) => this.updateFilterField(resource, 'gte', value)}
            />
            <InputNumber
              placeholder="To"
              onChange={(value: string) => this.updateFilterField(resource, 'lte', value)}
            />
          </>
        )
        :
        (
          <InputNumber
            placeholder="Number"
            onChange={(value: string) =>
              this.updateFilterField(resource, '', value)
            }
          />
        )
    );
  };
}
