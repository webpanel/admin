import * as React from "react";
import { EntityField, IEntityFieldFilterProps } from "../EntityField";
export declare class EntityFieldNumber<T, C> extends EntityField<T, C> {
    inputElement(props?: {
        value?: any;
        onChange?: (value: any, valueElement: React.ReactNode) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
    filterDropdownInput: (props: IEntityFieldFilterProps<number>) => JSX.Element;
    get filterNormalize(): (values: any[]) => {
        [key: string]: any;
    };
    get filterDenormalize(): (values: {
        [key: string]: any;
    }) => any[];
}
