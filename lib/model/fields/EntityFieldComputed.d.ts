import * as React from 'react';
import { EntityField, IEntityFieldConfig } from '../EntityField';
export interface IEntityFieldComputedConfig<T> extends IEntityFieldConfig<T> {
    columnName?: string;
    fetchField?: string;
}
export declare class EntityFieldComputed<T> extends EntityField<T, IEntityFieldComputedConfig<T>> {
    columnName(): string;
    fetchField(): string | null;
    inputElement(props?: {
        value?: any;
        onChange?: (value: any, valueElement: React.ReactNode) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
}
