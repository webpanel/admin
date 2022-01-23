import * as React from "react";
import { EntityField, IEntityFieldConfig } from "../EntityField";
export declare class EntityFieldString<T, C extends IEntityFieldConfig<T>> extends EntityField<T, C> {
    inputElement(props?: {
        value?: any;
        onChange?: (value: any, valueElement: React.ReactNode) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
}
