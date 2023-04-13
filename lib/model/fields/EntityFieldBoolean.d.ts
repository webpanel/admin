import * as React from "react";
import { EntityField, IEntityFieldConfig, IEntityFieldFilterProps, IEntityFieldRenderOptions } from "../EntityField";
export interface IEntityFieldBooleanConfig<T> extends IEntityFieldConfig<T> {
}
export declare class EntityFieldBoolean<T> extends EntityField<T, IEntityFieldBooleanConfig<T>> {
    private renderValue;
    get render(): (record: T, options?: IEntityFieldRenderOptions) => React.ReactNode;
    inputElement(props?: {
        value?: any;
        onChange?: (value: any, valueElement: React.ReactNode) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
    filterDropdownInput: (props: IEntityFieldFilterProps<string>) => JSX.Element;
    get filterNormalize(): (values: boolean[]) => {
        [key: string]: any;
    };
    get filterDenormalize(): (values: {
        [key: string]: any;
    }) => any[];
}
