import * as React from 'react';
import { EntityField, IEntityFieldConfig } from '../EntityField';
import { ResourceCollection } from 'webpanel-data';
export interface IEntityFieldDateConfig<T> extends IEntityFieldConfig<T> {
    showTime?: boolean;
    format?: string;
}
export declare class EntityFieldDate<T> extends EntityField<T, IEntityFieldDateConfig<T>> {
    private readonly format;
    readonly render: ((record: T) => React.ReactNode);
    isFiltered(resource: ResourceCollection): boolean;
    filterDropdownInput: (resource: ResourceCollection) => JSX.Element;
    inputElement(props?: {
        value?: any;
        onChange?: (value: any) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
}
