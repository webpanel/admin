import * as React from 'react';
import { EntityField, IEntityFieldConfig } from '../EntityField';
export interface IEntityFieldBooleanConfig<T> extends IEntityFieldConfig<T> {
}
export declare class EntityFieldBoolean<T> extends EntityField<T, IEntityFieldBooleanConfig<T>> {
    readonly valuePropName: string;
    readonly render: ((record: T) => React.ReactNode);
    inputElement(): React.ReactNode;
}
