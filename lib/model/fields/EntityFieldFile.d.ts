import * as React from "react";
import { EntityField, IEntityFieldConfig, IEntityFieldRenderOptions } from "../EntityField";
import { Thunk } from "ts-thunk";
export interface IEntityFieldFileConfig<T> extends IEntityFieldConfig<T> {
    hostURL?: string;
    uploadURL?: string;
    accessToken?: Thunk<Promise<string>>;
}
export declare class EntityFieldFile<T> extends EntityField<T, IEntityFieldFileConfig<T>> {
    fetchField(): string | null;
    columnName(): string;
    get render(): (record: T, options?: IEntityFieldRenderOptions) => React.ReactNode;
    inputElement(props?: {
        value?: string;
        onChange?: (value: any, valueElement: React.ReactNode) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
}
