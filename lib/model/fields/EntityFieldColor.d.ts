import * as React from 'react';
import { EntityField } from '../EntityField';
export declare class EntityFieldColor<T, C> extends EntityField<T, C> {
    readonly render: ((record: T) => React.ReactNode);
    inputElement(props?: {
        value?: any;
        onChange?: (value: any) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
}
