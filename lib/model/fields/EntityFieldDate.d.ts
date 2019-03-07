import * as React from "react";
import * as moment from "moment";
import { EntityField, IEntityFieldConfig, IEntityFieldFilterProps } from "../EntityField";
export interface IEntityFieldDateConfig<T> extends IEntityFieldConfig<T> {
    showTime?: boolean;
    format?: string;
}
export declare class EntityFieldDate<T> extends EntityField<T, IEntityFieldDateConfig<T>> {
    private readonly format;
    private renderValue;
    readonly render: ((record: T) => React.ReactNode);
    inputElement(props?: {
        value?: any;
        onChange?: (value: any, valueElement: React.ReactNode) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
    filterDropdownInput: (props: IEntityFieldFilterProps<moment.Moment>) => JSX.Element;
    readonly filterFormatter: ((values: moment.Moment[]) => {
        [key: string]: any;
    });
}
