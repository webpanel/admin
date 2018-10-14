import * as React from 'react';
import { EntityField, IEntityFieldConfig } from '../EntityField';
export interface IEntityFieldDateConfig<T> extends IEntityFieldConfig<T> {
    showTime?: boolean;
}
export declare class EntityFieldDate<T> extends EntityField<T, IEntityFieldDateConfig<T>> {
    readonly render: ((record: T) => React.ReactNode);
    inputElement(props?: {
        value?: any;
        onChange?: (value: any) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
}
