import * as React from "react";
import { EntityField, IEntityFieldConfig, IEntityFieldFilterProps } from "../EntityField";
import { IEntityListColumnAlign } from "../../components/pages/list";
import { InputNumberProps } from "antd/lib/input-number";
import { EntityBase } from "../EntityBase";
export interface IEntityFieldNumberConfig<T> extends IEntityFieldConfig<T> {
    format?: string;
    inputProps?: InputNumberProps;
}
export declare class EntityFieldNumber<T> extends EntityField<T, IEntityFieldNumberConfig<T>> {
    readonly name: string;
    protected readonly config: IEntityFieldNumberConfig<T>;
    readonly _entity: EntityBase;
    constructor(name: string, config: IEntityFieldNumberConfig<T>, _entity: EntityBase);
    get listColumnAlign(): IEntityListColumnAlign;
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
