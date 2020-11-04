import * as React from "react";
import { EntityField, IEntityFieldConfig, IEntityFieldFilterProps, IEntityFieldRenderOptions } from "../EntityField";
import { Thunk } from "ts-thunk";
export interface IOption {
    value: string;
    label: React.ReactNode;
}
export interface IEntityFieldEnumConfig<T> extends IEntityFieldConfig<T> {
    options: Thunk<IOption[]>;
}
export declare class EntityFieldEnum<T> extends EntityField<T, IEntityFieldEnumConfig<T>> {
    get render(): (record: T, options?: IEntityFieldRenderOptions) => React.ReactNode;
    inputElement(props?: {
        value?: any;
        onChange?: (value: any, valueElement: React.ReactNode) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
    filterDropdownInput: (props: IEntityFieldFilterProps<string>) => JSX.Element;
    get filterNormalize(): (values: string[] | null) => {
        [key: string]: any;
    };
    get filterDenormalize(): (values: {
        [key: string]: any;
    }) => any[];
}
