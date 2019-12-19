import * as React from 'react';
import { EntityField } from '../EntityField';
export declare class EntityFieldColor<T, C> extends EntityField<T, C> {
    private renderValue;
    get render(): ((record: T) => React.ReactNode);
    inputElement(props?: {
        value?: any;
        onChange?: (value: any, valueElement: React.ReactNode) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
}
