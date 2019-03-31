import * as React from 'react';
import { EntityField } from '../EntityField';
export declare class EntityFieldText<T, C> extends EntityField<T, C> {
    inputElement(props?: {
        value?: any;
        onChange?: (value: any, valueElement: React.ReactNode) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
    readonly filterNormalize: (values: any[]) => {
        [key: string]: any;
    };
    readonly filterDenormalize: (values: {
        [key: string]: any;
    }) => any[];
}
