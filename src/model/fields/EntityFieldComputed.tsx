import * as React from 'react';
import { EntityField, IEntityFieldConfig } from '../EntityField';

export interface IEntityFieldComputedConfig<T> extends IEntityFieldConfig<T> {
  fetchField?: string;
}
export class EntityFieldComputed<T> extends EntityField<
  T,
  IEntityFieldComputedConfig<T>
> {
  public fetchField(): string | null {
    return this.config.fetchField || super.fetchField();
  }

  public inputElement(props?: {
    value?: any;
    onChange?: (value: any, valueElement: React.ReactNode) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    return 'cannot edit computed field';
  }
}
