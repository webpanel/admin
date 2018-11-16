import * as React from 'react';
import { EntityField } from '../EntityField';
import { ResourceCollection } from 'webpanel-data';
export declare class EntityFieldNumber<T, C> extends EntityField<T, C> {
    inputElement(props?: {
        value?: any;
        onChange?: (value: any) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
    filterDropdownInput: (resource: ResourceCollection) => JSX.Element;
}
