import * as React from 'react';
import { EntityField, IEntityFieldFilterProps } from '../EntityField';
export declare class EntityFieldNumber<T, C> extends EntityField<T, C> {
    inputElement(props?: {
        value?: any;
        onChange?: (value: any) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
    filterDropdownInput: (props: IEntityFieldFilterProps<number>) => JSX.Element;
    readonly filterFormatter: ((values: any[]) => {
        [key: string]: any;
    });
}
