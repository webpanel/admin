import * as React from "react";
import { EntityField, IEntityFieldConfig, IEntityFieldFilterProps } from "../EntityField";
import { Thunk } from "ts-thunk";
export interface IOption {
    value: string;
    label: string;
}
export interface IEntityFieldEnumConfig<T> extends IEntityFieldConfig<T> {
    options: Thunk<IOption[]>;
}
export declare class EntityFieldEnum<T> extends EntityField<T, IEntityFieldEnumConfig<T>> {
    readonly render: ((record: T) => React.ReactNode);
    inputElement(props?: {
        value?: any;
        onChange?: (value: any, valueElement: React.ReactNode) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
    filterDropdownInput: (props: IEntityFieldFilterProps<string>) => JSX.Element;
    readonly filterFormatter: ((values: string[]) => {
        [key: string]: any;
    });
}
