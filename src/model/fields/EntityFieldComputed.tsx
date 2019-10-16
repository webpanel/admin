import * as React from 'react';

import { EntityField, IEntityFieldConfig } from '../EntityField';

// import { FieldAction } from '../permissions';

export interface IEntityFieldComputedConfig<T> extends IEntityFieldConfig<T> {
  columnName?: string;
  fetchField?: string;
}
export class EntityFieldComputed<T> extends EntityField<
  T,
  IEntityFieldComputedConfig<T>
> {
  public columnName(): string {
    return this.config.columnName || super.columnName();
  }
  public fetchField(): string | null {
    return this.config.fetchField || super.fetchField();
  }
  public get writeable(): boolean {
    return false;
  }

  public inputElement(props?: {
    value?: any;
    onChange?: (value: any, valueElement: React.ReactNode) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    return 'cannot edit computed field';
  }
}
