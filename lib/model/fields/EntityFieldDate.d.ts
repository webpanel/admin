import * as React from "react";
import * as moment from "moment";
import { EntityField, IEntityFieldConfig, IEntityFieldConfigFilter, IEntityFieldFilterProps, IEntityFieldRenderOptions } from "../EntityField";
import { EntityBase } from "../EntityBase";
export interface IEntityFieldDateConfig<T> extends IEntityFieldConfig<T> {
    showTime?: boolean;
    format?: string;
}
export declare const dateFieldFilter: (columnName: string, range?: boolean | undefined, format?: string | undefined, showTime?: boolean | undefined) => IEntityFieldConfigFilter;
export declare class EntityFieldDate<T, C extends IEntityFieldDateConfig<T>> extends EntityField<T, C> {
    readonly name: string;
    protected readonly config: C;
    readonly _entity: EntityBase;
    private filterConfig;
    constructor(name: string, config: C, _entity: EntityBase);
    private get format();
    private renderValue;
    get render(): (record: T, options?: IEntityFieldRenderOptions) => React.ReactNode;
    inputElement(props?: {
        value?: any;
        onChange?: (value: any, valueElement: React.ReactNode) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
    filterDropdownInput: (props: IEntityFieldFilterProps<moment.Moment>) => React.ReactNode;
    get filterNormalize(): (values: moment.Moment[]) => {
        [key: string]: any;
    };
    get filterDenormalize(): (values: {
        [key: string]: any;
    }) => any[];
}
