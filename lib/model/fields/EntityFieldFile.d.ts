import * as React from 'react';
import { EntityField, IEntityFieldConfig } from '../EntityField';
export interface IEntityFieldFileConfig<T> extends IEntityFieldConfig<T> {
    uploadURL?: string;
}
export declare class EntityFieldFile<T> extends EntityField<T, IEntityFieldFileConfig<T>> {
    fetchField(): string | null;
    columnName(): string;
    readonly render: (record: T) => React.ReactNode;
    inputElement(props?: {
        value?: string;
        onChange?: (value: any, valueElement: React.ReactNode) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
}
