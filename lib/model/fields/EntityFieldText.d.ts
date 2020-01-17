import * as React from "react";
import { EntityField, IEntityFieldConfig, IEntityFieldRenderOptions } from "../EntityField";
export declare class EntityFieldText<T, C extends IEntityFieldConfig<T>> extends EntityField<T, C> {
    inputElement(props?: {
        value?: any;
        onChange?: (value: any, valueElement: React.ReactNode) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
    get filterNormalize(): (values: any[]) => {
        [key: string]: any;
    };
    get filterDenormalize(): (values: {
        [key: string]: any;
    }) => any[];
    get render(): (record: T, options?: IEntityFieldRenderOptions) => React.ReactNode;
}
