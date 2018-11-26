import * as React from 'react';
import { EntityField } from '../EntityField';
export declare class EntityFieldText<T, C> extends EntityField<T, C> {
    inputElement(props?: {
        value?: any;
        onChange?: (value: any) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
    readonly filterFormatter: ((values: any[]) => {
        [key: string]: any;
    });
}
