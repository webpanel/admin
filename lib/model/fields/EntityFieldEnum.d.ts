import * as React from 'react';
import { EntityField, IEntityFieldConfig } from '../EntityField';
import { Thunk } from 'ts-thunk';
import { ResourceCollection } from 'webpanel-data';
export interface IOption {
    value: string;
    label: string;
}
export interface IEntityFieldEnumConfig<T> extends IEntityFieldConfig<T> {
    options: Thunk<IOption[]>;
}
export declare class EntityFieldEnum<T> extends EntityField<T, IEntityFieldEnumConfig<T>> {
    readonly render: ((record: T) => React.ReactNode);
    filterDropdownInput: (resource: ResourceCollection) => JSX.Element;
    inputElement(props?: {
        value?: any;
        onChange?: (value: any) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
}
