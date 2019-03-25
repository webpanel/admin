import * as React from 'react';
import { EntityField, FieldSections, IEntityFieldConfig } from '../EntityField';
import { FieldAction } from '../permissions';
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
    visible(section: FieldSections, action: FieldAction, strict?: boolean): boolean;
}
