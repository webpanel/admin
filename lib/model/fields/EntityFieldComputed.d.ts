import * as React from 'react';
import { EntityField, IEntityFieldConfig } from '../EntityField';
export interface IEntityFieldComputedConfig<T> extends IEntityFieldConfig<T> {
    fetchField?: string;
}
export declare class EntityFieldComputed<T> extends EntityField<T, IEntityFieldComputedConfig<T>> {
    fetchField(): string | null;
    readonly writeable: boolean;
    inputElement(props?: {
        value?: any;
        onChange?: (value: any, valueElement: React.ReactNode) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
}
