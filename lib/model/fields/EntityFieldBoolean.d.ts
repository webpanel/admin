import * as React from 'react';
import { EntityField, IEntityFieldConfig } from '../EntityField';
export interface IEntityFieldBooleanConfig<T> extends IEntityFieldConfig<T> {
}
export declare class EntityFieldBoolean<T> extends EntityField<T, IEntityFieldBooleanConfig<T>> {
    readonly valuePropName: string;
    private renderValue;
    readonly render: ((record: T) => React.ReactNode);
    inputElement(props?: {
        value?: any;
        onChange?: (value: any, valueElement: React.ReactNode) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
    readonly filterNormalize: ((values: boolean[]) => {
        [key: string]: any;
    });
    readonly filterDenormalize: (values: {
        [key: string]: any;
    }) => any[];
}
