import * as React from "react";
import { EntityField, IEntityFieldConfig, IEntityFieldFilterProps } from "../EntityField";
import { Entity } from "../Entity";
import { IEntityListColumnAlign } from "../../components/pages/list";
import { InputNumberProps } from "antd/lib/input-number";
export declare const PercentageInput: (props: InputNumberProps) => JSX.Element;
export interface IEntityFieldPercentageConfig<T> extends IEntityFieldConfig<T> {
}
export declare class EntityFieldPercentage<T> extends EntityField<T, IEntityFieldPercentageConfig<T>> {
    readonly name: string;
    protected readonly config: IEntityFieldPercentageConfig<T>;
    readonly entity: Entity;
    constructor(name: string, config: IEntityFieldPercentageConfig<T>, entity: Entity);
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
