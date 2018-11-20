import * as React from 'react';
import { EntityField } from '../EntityField';
import { InputNumber } from 'antd';
import { ResourceCollection } from 'webpanel-data';
import { Button } from 'antd';

export class EntityFieldNumber<T, C> extends EntityField<T, C> {
  public inputElement(props?: {
    value?: any;
    onChange?: (value: any) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    return <InputNumber {...props} />;
  }

  public isFiltered(resource: ResourceCollection): boolean {
    return (
      this.valueForFilterField(resource, null) ||
      this.valueForFilterField(resource, 'gte') ||
      this.valueForFilterField(resource, 'lte')
    );
  }

  public filterDropdownInput = (resource: ResourceCollection) => {
    return (
      <>
        {this.range ? (
          <>
            <InputNumber
              placeholder="From"
              defaultValue={this.valueForFilterField(resource, 'gte')}
              onChange={(value: string) =>
                this.updateFilterField(resource, 'gte', value)
              }
            />
            <InputNumber
              placeholder="To"
              defaultValue={this.valueForFilterField(resource, 'lte')}
              onChange={(value: string) =>
                this.updateFilterField(resource, 'lte', value)
              }
            />
          </>
        ) : (
          <InputNumber
            placeholder="Number"
            defaultValue={this.valueForFilterField(resource, null)}
            onChange={(value: string) =>
              this.updateFilterField(resource, null, value)
            }
          />
        )}
        <Button
          disabled={!this.isFiltered(resource)}
          onClick={() => this.clearFilters(resource)}
          icon="delete"
        />
      </>
    );
  };
}
