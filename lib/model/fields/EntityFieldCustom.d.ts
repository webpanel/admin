import * as React from "react";
import { EntityField, IEntityFieldConfig } from "../EntityField";
export interface IEntityFieldCustomConfig<T> extends IEntityFieldConfig<T> {
    fetchField?: string;
    editFetchField?: string;
    inputElement: (props: {
        value: T | undefined;
        onChange: (value?: T) => void;
    }) => React.ReactNode;
}
export declare class EntityFieldCustom<T, C extends IEntityFieldCustomConfig<T>> extends EntityField<T, C> {
    editFetchField(): string;
    fetchField(): string | null;
    inputElement(props?: {
        value?: T;
        onChange?: (value: any, valueElement: React.ReactNode) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
}
