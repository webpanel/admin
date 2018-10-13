import * as React from 'react';
import { EntityField, IEntityFieldConfig } from '../EntityField';
interface IEntityFieldDateConfig<T> extends IEntityFieldConfig<T> {
    showTime?: boolean;
}
export declare class EntityFieldDate<T> extends EntityField<T, IEntityFieldDateConfig<T>> {
    readonly render: ((record: T) => React.ReactNode);
    inputElement(): React.ReactNode;
}
export {};
