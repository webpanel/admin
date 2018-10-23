import * as React from 'react';
import { EntityField, IEntityFieldConfig } from '../EntityField';
export interface IOption {
    value: string;
    label: string;
}
export interface IEntityFieldEnumConfig<T> extends IEntityFieldConfig<T> {
    options: IOption[];
}
export declare class EntityFieldEnum<T> extends EntityField<T, IEntityFieldEnumConfig<T>> {
    inputElement(props?: {
        value?: any;
        onChange?: (value: any) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
}
